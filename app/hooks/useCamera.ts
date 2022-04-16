import {
  useCallback,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

export const CameraContext = createContext<{
  camera : boolean;
  setCamera: Dispatch<SetStateAction<boolean>>;
}>({ camera: false, setCamera: () => {return}});

export const useCamera = () => {
  const { camera, setCamera } = useContext(CameraContext);
  const activated = useCallback(
    () => {setCamera(true)},
    [setCamera]
  );

  const disabled = useCallback(() => {
    () => { setCamera(false)}
  }, [setCamera]);

  return { camera, cameraActivated: activated, cameraDisabled: disabled };
};
