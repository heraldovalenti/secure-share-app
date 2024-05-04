import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type DeviceProviderContextType = {
  devs: MediaDeviceInfo[];
  error: unknown;
  toggleDevice: () => void;
  device: MediaDeviceInfo | undefined;
};

const DeviceProviderContext = createContext<DeviceProviderContextType | null>(
  null
);

export const useDevices = () => {
  const context = useContext(DeviceProviderContext);
  if (!context) {
    throw new Error(
      `${useDevices.name}() should be used inside a <${DeviceProvider.name} />`
    );
  }
  return context;
};

export const DeviceProvider: FC<PropsWithChildren> = ({ children }) => {
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
  const device = useMemo(() => videoDevs[selected], [videoDevs, selected]);

  return (
    <DeviceProviderContext.Provider
      value={{
        devs: videoDevs,
        error,
        toggleDevice,
        device,
      }}
    >
      {children}
    </DeviceProviderContext.Provider>
  );
};
