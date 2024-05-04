import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useDevices } from "../hooks/useDevices";

export const VideoCam = () => {
  const webcamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  const { error, constraints, device, videoDevs, toggleDevice } = useDevices();
  return (
    <div>
      {!!error && <p>error: {JSON.stringify(error)}</p>}
      {!!error && <p>error: {error.toString()}</p>}
      <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={200}
        videoConstraints={constraints}
      />
      <button onClick={capture}>Capture photo</button>
      <button onClick={toggleDevice}>Toggle</button>
      <label>Active: {device?.deviceId}</label>
      {videoDevs.map((d) => {
        return (
          <div
            key={d.deviceId}
            style={{ backgroundColor: "#aaa", margin: "10px" }}
          >
            <ul>
              <li>{d.deviceId} </li>
              <li>{d.label} </li>
              <li>{d.kind} </li>
              <li>{d.groupId} </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
