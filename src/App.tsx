import { useRequestPermission } from "./hooks/useRequestPermission";
import { VideoCam } from "./components/VideoCam";

function App() {
  const { isAllowed } = useRequestPermission();
  return <div>{isAllowed ? <VideoCam /> : null}</div>;
}

export default App;
