import { ReactElement } from "react";
import clsx from "clsx";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactElement;
};

export default function IconButton({
  icon,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={clsx("hover:bg-gray-200 rounded-full p-2", className)}
    >
      {icon}
    </button>
  );
}
