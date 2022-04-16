import React, {
  useState,
} from "react";
import { CameraContext } from "../useCamera";

type Props = { children: React.ReactNode };
export const CameraProvider = ({ children }: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [camera, setCamera] = useState(false);
  return (
    <CameraContext.Provider value={{ setCamera, camera }}>
      {children}
    </CameraContext.Provider>
  );
};