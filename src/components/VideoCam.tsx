import { FC, useCallback, useMemo, useRef } from "react";
import Webcam from "react-webcam";
import { useDevices } from "../providers/DevicesProvider";
import { Button } from "./Button";

export const VideoCam: FC<{
  goPreview: (photo: string) => void;
  goInit: () => void;
}> = ({ goPreview, goInit }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const photo = webcamRef.current?.getScreenshot();
    if (typeof photo === "string") {
      goPreview(photo);
    }
  }, [goPreview]);

  const { toggleDevice, device, devices } = useDevices();
  const constraints = useMemo(
    () => ({
      // width: 200, height: 200,
      deviceId: device?.deviceId,
    }),
    [device?.deviceId]
  );
  const singleDevice = useMemo(() => devices.length === 1, [devices.length]);

  return (
    <div>
      <Button onClick={goInit} label="Volver" />
      <Button onClick={capture} label="Tomar foto" />

      {!singleDevice && (
        <Button onClick={toggleDevice} label="Cambiar camara" />
      )}
      <Webcam
        audio={false}
        // height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        // width={200}
        videoConstraints={constraints}
        mirrored={true}
      />
    </div>
  );
};
