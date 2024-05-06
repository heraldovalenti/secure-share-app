import { FC, useCallback, useMemo, useRef } from "react";
import Webcam from "react-webcam";
import { useDevices } from "../providers/DevicesProvider";
import { Container, Button, Grid } from "@mui/material";

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
    <Grid>
      <Grid>
        <Button onClick={goInit} variant="contained">
          Volver
        </Button>
        <Button onClick={capture} variant="contained">
          Tomar foto
        </Button>

        {!singleDevice && (
          <Button onClick={toggleDevice} variant="outlined">
            Cambiar camara
          </Button>
        )}
      </Grid>
      <Grid>
        <Webcam
          audio={false}
          // height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          // width={200}
          videoConstraints={constraints}
          mirrored={true}
        />
      </Grid>
    </Grid>
  );
};
