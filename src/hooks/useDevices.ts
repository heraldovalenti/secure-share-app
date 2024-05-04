import { useCallback, useEffect, useMemo, useState } from "react";

const videoConstraints = {
  width: 200,
  height: 200,
};
export const useDevices = () => {
  const [error, setError] = useState<unknown>();
  const [devs, setDevs] = useState<MediaDeviceInfo[]>([]);
  useEffect(() => {
    (async () => {
      try {
        console.log("requesting devices...");
        const result = await navigator.mediaDevices.enumerateDevices();
        console.log("devices read!!!", result);
        setDevs(result);
      } catch (e) {
        setError(e);
        console.error(e);
      }
    })();
  }, []);

  const videoDevs = useMemo(
    () => devs.filter((d) => d.kind === "videoinput"),
    [devs]
  );

  const [selected, setSelected] = useState(0);
  const toggleDevice = useCallback(() => {
    if (selected < videoDevs.length - 1) {
      setSelected(selected + 1);
    } else {
      setSelected(0);
    }
  }, [selected, videoDevs.length]);
  const constraints = useMemo(
    () => ({ ...videoConstraints, deviceId: videoDevs[selected]?.deviceId }),
    [selected, videoDevs]
  );
  const device = useMemo(() => videoDevs[selected], [videoDevs, selected]);

  return {
    error,
    constraints,
    device,
    videoDevs,
    toggleDevice,
  };
};
