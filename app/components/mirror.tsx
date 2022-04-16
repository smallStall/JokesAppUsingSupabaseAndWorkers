import React, { useRef, useEffect } from "react";
import { KMean } from "~/utils/k-means";
import { useCamera } from "~/hooks/useCamera";

const CANVAS_WIDTH = 70;
const CANVAS_HEIGHT = 50;

export function Mirror() {
  const { cameraDisabled, cameraActivated } = useCamera();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const grvArrRef = useRef([]);
  const remoteVideosRef = useRef<HTMLVideoElement>(null);
  const srcCanvasRef = useRef<HTMLCanvasElement>(null);
  const pixelRef = useRef<HTMLCanvasElement>(null);
  const halfRef = useRef<HTMLCanvasElement>(null);
  const getMedia = () => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        const videoElm = localVideoRef.current;
        cameraActivated();
        if (videoElm) {
          videoElm.srcObject = stream;
          videoElm.play();
        }
      })
      .catch((error) => {
        console.error("mediaDevice.getUserMedia() error:", error);
        cameraDisabled();
        return;
      });
  };

  useEffect(() => {
    const canvasUpdate = () => {
      if (
        !srcCanvasRef.current ||
        !pixelRef.current ||
        !halfRef.current ||
        !localVideoRef.current
      ) {
        return;
      }
      const canvasContext = srcCanvasRef.current.getContext("2d");
      if (!canvasContext) {
        return;
      }

      /*drawImageをトリミングに修正*/
      const videoWidth = localVideoRef.current.videoWidth
      const videoHeight = localVideoRef.current.videoHeight;
      canvasContext?.drawImage(
        localVideoRef.current,
        0,
        0,
        srcCanvasRef.current.width,
        srcCanvasRef.current.width * videoHeight / videoWidth
      );
      if (srcCanvasRef.current) {
        const srcImageData = canvasContext.getImageData(
          0,
          0,
          srcCanvasRef.current.width,
          srcCanvasRef.current.height
        );
        const pixelImageData = srcImageData;
        const km = new KMean(
          srcImageData,
          pixelImageData,
          16,
          3,
          grvArrRef.current
        );
        grvArrRef.current = km.subtractiveColor();
        //ピクセルを半分にする
        if (!pixelImageData) {
          return;
        }
        const halfContext = halfRef?.current?.getContext("2d");
        const halfImage = halfContext?.getImageData(
          0,
          0,
          halfRef.current.width,
          halfRef.current.height
        );
        if (!halfImage || !halfContext) {
          return;
        }
        for (let i = 0; i < halfImage.data.length; i += 4) {
          const y = Math.floor(i / 4 / halfImage.width);
          const x = Math.floor((i / 4) % halfImage.width);
          for (let rgba = 0; rgba < 4; rgba++) {
            halfImage.data[(x + y * halfImage.width) * 4 + rgba] =
              pixelImageData.data[
                (x * 2 + y * pixelImageData.width * 2) * 4 + rgba
              ];
          }
        }
        halfContext.putImageData(halfImage, 0, 0);
      }
    };
    setInterval(() => canvasUpdate(), 300);
    getMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <p>あなたのwebカメラ</p>
      <video
        ref={localVideoRef}
        width="400px"
        autoPlay
        muted
        playsInline
        style={{ display: "none" }}
      ></video>
      <video
        ref={remoteVideosRef}
        width="400px"
        autoPlay
        muted
        playsInline
      ></video>
      <canvas
        className="none"
        ref={srcCanvasRef}
        width={CANVAS_WIDTH + "px"}
        height={CANVAS_HEIGHT + "px"}
      ></canvas>
      <canvas
        className="none"
        ref={pixelRef}
        width={CANVAS_WIDTH + "px"}
        height={CANVAS_HEIGHT + "px"}
      ></canvas>
      <canvas
        ref={halfRef}
        width={CANVAS_WIDTH / 2 + "px"}
        height={CANVAS_HEIGHT / 2 + "px"}
      ></canvas>
    </section>
  );
}
