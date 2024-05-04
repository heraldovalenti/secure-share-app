import { useCallback, useMemo, useRef } from "react";
import Webcam from "react-webcam";
import { useDevices } from "../providers/DeviceProvider";

export const VideoCam = () => {
  const webcamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    if (typeof imageSrc === "string") window.open(imageSrc);
  }, [webcamRef]);

  const { toggleDevice, device } = useDevices();
  const constraints = useMemo(
    () => ({ width: 200, height: 200, deviceId: device?.deviceId }),
    [device?.deviceId]
  );

  return (
    <div>
      <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={200}
        videoConstraints={constraints}
        mirrored={true}
      />
      <button style={{ height: 50 }} onClick={capture}>
        Capture photo
      </button>
      <button style={{ height: 50 }} onClick={toggleDevice}>
        Toggle
      </button>
    </div>
  );
};
