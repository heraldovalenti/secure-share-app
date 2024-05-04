import { useRequestPermission } from "./hooks/useRequestPermission";
import { VideoCam } from "./components/VideoCam";
import { DevicesProvider } from "./providers/DevicesProvider";
import { ActiveDevice } from "./components/ActiveDevice";

function App() {
  const { isAllowed } = useRequestPermission();
  return (
    <div>
      <DevicesProvider>
        {isAllowed ? (
          <>
            <VideoCam />
            <ActiveDevice />
          </>
        ) : null}
      </DevicesProvider>
    </div>
  );
}

export default App;
