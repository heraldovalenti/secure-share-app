import { useDevices } from "../providers/DevicesProvider";

export const ActiveDevice = () => {
  const { device, devices: devs } = useDevices();

  return (
    <>
      {devs.map((d) => {
        const isActive = device?.deviceId === d.deviceId;
        return (
          <div
            key={d.deviceId}
            style={{
              backgroundColor: !isActive ? "#aaa" : "#f06",
              margin: "10px",
            }}
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
    </>
  );
};
