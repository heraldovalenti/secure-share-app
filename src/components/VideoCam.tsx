import { useCallback, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useDevices } from "../providers/DevicesProvider";

export const VideoCam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [snapshot, setSnapshot] = useState("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (typeof imageSrc === "string") {
      setSnapshot(imageSrc);
    }
  }, []);

  const { toggleDevice, device, devices } = useDevices();
  const constraints = useMemo(
    () => ({
      // width: 200, height: 200,
      deviceId: device?.deviceId,
    }),
    [device?.deviceId]
  );
  const singleDevice = useMemo(() => devices.length > 1, [devices.length]);

  return (
    <div>
      <Webcam
        audio={false}
        // height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        // width={200}
        videoConstraints={constraints}
        mirrored={true}
      />
      <button style={{ height: 50 }} onClick={capture}>
        Capture photo
      </button>
      {singleDevice && (
        <button style={{ height: 50 }} onClick={toggleDevice}>
          Toggle
        </button>
      )}
      {!!snapshot && (
        <img
          src={snapshot}
          // height={200} width={200}
        />
      )}
    </div>
  );
};
