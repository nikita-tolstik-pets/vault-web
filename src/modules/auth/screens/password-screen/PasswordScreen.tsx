import { useFormState } from "react-hook-form";
import toast from "react-hot-toast";
import { BsShield } from "react-icons/bs";
import { authService } from "modules/auth/services";
import { logoSrc } from "shared/assets";
import { useForm } from "shared/hooks";
import { Button, Input } from "shared/ui";
import * as Yup from "yup";

type FormValues = {
  password: string;
};

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .test("password", "Invalid password", (value) => authService.isValidPassword(value)),
});

export default function SignInScreen() {
  const { handleSubmit, register, control } = useForm<FormValues>({ validationSchema, mode: "onSubmit" });
  const formState = useFormState<FormValues>({ control });

  const onSubmit = async (values: FormValues) => {
    try {
      await authService.signInWithPassword(values.password);
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        toast.error(e.message);
      }
    }
  };

  return (
    <div className="flex items-center h-full">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <img src={logoSrc} alt="Application Logo" width={100} className="mx-auto mb-12" />
        <p className="text-lg font-semibold text-gray-900 text-center">Type password to unlock your vault</p>

        <Input
          label="Password"
          className="mt-6"
          icon={<BsShield />}
          error={formState.errors.password?.message}
          {...register("password")}
        />

        <Button className="mt-5 w-full" type="submit">
          Unlock
        </Button>
      </form>
    </div>
  );
}
