import { forwardRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import IconButton from "shared/ui/icon-button";
import Input, { InputProps } from "shared/ui/input";

type PasswordInputProps = InputProps & {
  canView?: boolean;
};

export default forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { canView = true, ...rest },
  ref
) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      ref={ref}
      type={visible ? "text" : "password"}
      icon={
        canView ? (
          <IconButton onClick={() => setVisible(!visible)} icon={visible ? <IoEyeOff /> : <IoEye />} />
        ) : undefined
      }
      {...rest}
    />
  );
});
