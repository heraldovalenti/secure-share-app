import { FC } from "react";
import { Button } from "./Button";

type InitProps = {
  goCamera: () => void;
};
export const Init: FC<InitProps> = ({ goCamera }) => {
  return (
    <div>
      <Button onClick={goCamera} label="Abrir camara" />
    </div>
  );
};
