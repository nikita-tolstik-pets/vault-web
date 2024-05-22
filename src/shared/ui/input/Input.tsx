import React, { forwardRef, ReactElement } from "react";
import { IconBaseProps } from "react-icons";
import { twMerge } from "tailwind-merge";

import styles from "./Input.module.css";

export type InputProps = {
  label?: string;
  error?: string;
  icon?: ReactElement<IconBaseProps>;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  InputProps?: React.InputHTMLAttributes<HTMLInputElement>;
} & Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "placeholder" | "readOnly" | "type" | "name" | "onBlur"
>;

export default forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { label, error, className, icon, InputProps: allInputProps, onClick, ...inputProps } = props;

  return (
    <div className={twMerge("flex flex-col", className)}>
      {!!label && <label className="mb-[6px] text-md font-semibold">{label}</label>}

      <div
        className={twMerge(
          "flex h-[40px] outline-none px-12 rounded-12 items-center border border-dark-800 focus-within:border-transparent transition-all",
          styles.input,
        )}
        onClick={onClick}
      >
        <input
          ref={ref}
          {...allInputProps}
          {...inputProps}
          className={twMerge("outline-none h-full w-full text-md bg-transparent", allInputProps?.className)}
        />
        <div className="pl-8">
          {!!icon &&
            React.cloneElement(icon, {
              className: "ml-auto flex-none text-white text-[20px]",
            })}
        </div>
      </div>

      {!!error && <span className="text-red-600 mt-[4px] text-sm">{error}</span>}
    </div>
  );
});
