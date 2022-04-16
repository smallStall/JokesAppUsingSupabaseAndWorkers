import React, { useState, useRef, useEffect } from "react";
import Peer, { MeshRoom } from "skyway-js"; //MediaConnection, SfuRoom
import { KMean } from "~/utils/k-means";
import { SkywaySign } from "~/utils/session.server";

type Props = {
  sign: SkywaySign | undefined;
};

type VideoStream = {
  stream: MediaStream;
  peerId: string;
};

export function Room({ sign: skywaySign }: Props) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const grvArrRef = useRef([]);
  const [remoteVideos, setRemoteVideos] = useState<VideoStream[]>([]);
  const srcCanvasRef = useRef<HTMLCanvasElement>(null);
  const pixelRef = useRef<HTMLCanvasElement>(null);
  const halfRef = useRef<HTMLCanvasElement>(null);
  const [room, setRoom] = useState<MeshRoom>();
  const [peer, setPeer] = useState<Peer>();
  const getMedia = () => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        const videoElm = localVideoRef.current;
        if (videoElm) {
          videoElm.srcObject = stream;
          videoElm.play();
        }
      })
      .catch((error) => {
        console.error("mediaDevice.getUserMedia() error:", error);
        return;
      });
  };
  useEffect(() => {
    if (!skywaySign) {
      return;
    }
    setPeer(
      new Peer(skywaySign.peerId, {
        key: window.ENV.SKYWAY_APIKEY,
        credential: skywaySign.credential,
        //debug: 3,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skywaySign]);
  useEffect(() => {
    peer?.on("open", () => {
      if (halfRef.current == null) {
        return;
      }
      setRoom(
        peer.joinRoom("fuuuuufu", {
          mode: "mesh",
          stream: halfRef.current.captureStream(),
          videoBandwidth: 10,
          audioReceiveEnabled: false,
          videoReceiveEnabled: true,
        })
      );
    });
  }, [peer]);
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
      canvasContext?.drawImage(
        localVideoRef.current,
        0,
        0,
        srcCanvasRef.current.width,
        srcCanvasRef.current.height
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
  }, []);
  const handleCall = () => {
    if (!peer || !halfRef.current || !remoteVideos) {
      return;
    }
  };
  useEffect(() => {
    if (!room) {
      return;
    }
    console.log("takneiatien");
    room.on("peerJoin", (peerId) => {
      console.log(`=== ${peerId} joined ===\n`);
    });
    room.on("stream", async (stream) => {
      console.log("stream");
      setRemoteVideos((prev) => [
        ...prev,
        { stream: stream, peerId: stream.peerId },
      ]);
    });
    room.on("peerLeave", (peerId) => {
      setRemoteVideos((prev) =>
        prev.filter((video) => {
          /*
          if (video.peerId === peerId) {
            video.stream.getTracks().forEach((track) => track.stop());
          }
          */
          return video.peerId !== peerId;
        })
      );
    });
    setRoom(room);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);
  const castVideo = () => {
    return remoteVideos.map((video) => {
      return <RemoteVideo video={video} key={video.peerId} />;
    });
  };
  console.log(remoteVideos);
  return (
    <div className="camera">
      <video
        ref={localVideoRef}
        width="400px"
        autoPlay
        muted
        playsInline
        style={{ display: "none" }}
      ></video>
      <canvas
        className="none"
        ref={srcCanvasRef}
        width="70px"
        height="46px"
      ></canvas>
      <canvas
        className="none"
        ref={pixelRef}
        width="70px"
        height="46px"
      ></canvas>
      <canvas
        className="mirror"
        ref={halfRef}
        width="35px"
        height="23px"
      ></canvas>
      {castVideo()}
      <button onClick={handleCall}>画面を停止</button>
    </div>
  );
}

const RemoteVideo = (props: { video: VideoStream }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = props.video.stream;
      const playPromise = videoRef.current
        .play()
        .catch((e) => console.error(e));
      if (playPromise !== undefined) {
        videoRef.current.play();
        console.log("play");
      }
    }
  }, [props.video]);
  return <video ref={videoRef} playsInline muted width={200}></video>;
};
