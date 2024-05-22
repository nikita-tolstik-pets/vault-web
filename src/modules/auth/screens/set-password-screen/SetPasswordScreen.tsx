import { useFormState } from "react-hook-form";
import toast from "react-hot-toast";
import { BsShield } from "react-icons/bs";
import { AxiosError } from "axios";
import { authService } from "modules/auth/services";
import { logoSrc } from "shared/assets";
import useForm from "shared/hooks/use-form";
import Button from "shared/ui/button";
import Input from "shared/ui/input";
import * as Yup from "yup";

type FormValues = {
  password: string;
};

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
});

export default function SetPasswordScreen() {
  const { handleSubmit, register, control } = useForm<FormValues>({
    validationSchema,
  });
  const formState = useFormState<FormValues>({ control });

  return (
    <div className="flex items-center h-full">
      <form
        className="w-full"
        onSubmit={handleSubmit(async (values) => {
          try {
            await authService.savePassword(values.password);
          } catch (e) {
            if (e instanceof AxiosError) {
              toast.error(e.message);
            }
          }
        })}
        noValidate
      >
        <img src={logoSrc} alt="Application Logo" width={100} className="mx-auto mb-12" />
        <h1 className="text-4xl font-black text-gray-900">Set your password</h1>

        <Input
          label="New password"
          className="mt-6"
          icon={<BsShield />}
          error={formState.errors.password?.message}
          {...register("password")}
        />

        <Button className="mt-5 w-full" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
