import { useFormState } from "react-hook-form";
import toast from "react-hot-toast";
import { BsKey } from "react-icons/bs";
import { Link } from "react-router-dom";
import { authService } from "modules/auth/services";
import { logoSrc } from "shared/assets";
import useForm from "shared/hooks/use-form";
import Button from "shared/ui/button";
import Input from "shared/ui/input";
import { AxiosError } from "axios";
import * as Yup from "yup";

type FormValues = {
  recoveryKey: string;
};

const validationSchema = Yup.object({
  recoveryKey: Yup.string().required("Recovery Key is required"),
});

export default function SignInScreen() {
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
            await authService.signIn(values.recoveryKey);
          } catch (e) {
            if (e instanceof AxiosError) {
              toast.error(e.message);
            }
          }
        })}
        noValidate
      >
        <img src={logoSrc} alt="Application Logo" width={100} className="mx-auto mb-12" />
        <h1 className="text-2xl font-black text-gray-900 text-center">Import your vault</h1>

        <Input
          label="Recovery Key"
          className="mt-6"
          icon={<BsKey />}
          error={formState.errors.recoveryKey?.message}
          {...register("recoveryKey")}
        />

        <Button className="mt-5 w-full" type="submit">
          Import
        </Button>

        <div className="flex gap-[4px] mt-4 justify-center text-sm">
          <span>Don't have account?</span>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
