import { FC } from "react";
import { XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      <XMarkIcon />
    </button>
  );
};

export const ToggleButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1" {...props}>
      {children}
    </button>
  );
};
