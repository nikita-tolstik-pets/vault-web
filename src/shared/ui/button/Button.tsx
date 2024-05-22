import { cloneElement, ReactElement } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactElement;
  variant?: ButtonVariant;
};

const variantToClasses = {
  primary: twMerge("text-white disabled:bg-dark-600 transition-all duration-300", styles.primary),
  secondary:
    "bg-dark-800 text-white hover:bg-dark-700 active:bg-dark-600 disabled:bg-dark-600 disabled:text-dark-400 transition-all",
} satisfies Record<ButtonVariant, string>;

export default function Button({ className, icon, children, variant = "primary", ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        "inline-flex justify-center items-center h-[40px] font-semibold rounded-12 text-md px-4",
        variantToClasses[variant],
        styles.button,
        className,
      )}
    >
      {children}
      {!!icon &&
        cloneElement(icon, {
          className: clsx("flex-none ml-2"),
        })}
    </button>
  );
}
