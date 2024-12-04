import { FC } from "react";
import { RevertIcon, XMarkIcon } from "./icons";

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

export const ReverseButton: FC<ButtonProps> = (props) => {
  return (
    <button 
    className="hover:text-gray-700 transition-colors flex items-center justify-center"
    {...props}
    >
      <RevertIcon/>
    </button>
  )
}

export const ToggleButton: FC<ButtonProps & {isToggled: boolean, onToggle:() => void}> = ({
  isToggled, 
  onToggle,
  children,
  ...props}) => {

  return(
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center"
    onClick={onToggle}
    {...props}
    >
      {isToggled ? "Hide": "Reveal"}
    </button>
  )
}