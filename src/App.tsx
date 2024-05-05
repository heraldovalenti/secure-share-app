import { useRequestPermission } from "./hooks/useRequestPermission";
import { DevicesProvider } from "./providers/DevicesProvider";
import { Loading } from "./components/Loading";
import { Warning } from "./components/Warning";
import { ScreenHandler } from "./components/ScreenHandler";

function App() {
  const { isAllowed, isRequested } = useRequestPermission();
  if (!isRequested) {
    return <Loading />;
  }
  if (!isAllowed) {
    return <Warning />;
  }
  return (
    <div>
      <DevicesProvider>
        <ScreenHandler />
      </DevicesProvider>
    </div>
  );
}

export default App;
