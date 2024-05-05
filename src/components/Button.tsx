import { FC } from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({ onClick, label, disabled }) => {
  return (
    <button style={{ height: 50 }} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
