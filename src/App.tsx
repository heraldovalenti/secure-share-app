import { useRequestPermission } from "./hooks/useRequestPermission";
import { VideoCam } from "./components/VideoCam";
import { DeviceProvider } from "./providers/DeviceProvider";
import { ActiveDevice } from "./components/ActiveDevice";

function App() {
  const { isAllowed } = useRequestPermission();
  return (
    <div>
      <DeviceProvider>
        {isAllowed ? (
          <>
            <VideoCam />
            <ActiveDevice />
          </>
        ) : null}
      </DeviceProvider>
    </div>
  );
}

export default App;
