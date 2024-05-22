import { useFormState } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { vaultKeysService } from "modules/vault/services/vault-keys";
import { useForm } from "shared/hooks";
import { Button, Input } from "shared/ui";
import * as Yup from "yup";

type FormValues = {
  name: string;
  description: string;
  value: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  value: Yup.string().required("Value is required"),
});

export default function CreateKeyScreen() {
  const navigate = useNavigate();
  const { handleSubmit, register, control } = useForm<FormValues>({
    validationSchema,
  });
  const formState = useFormState<FormValues>({ control });

  return (
    <div className="flex flex-col justify-center h-full">
      <h1 className="text-4xl font-black text-gray-900">New Key</h1>
      <form
        className="w-full"
        onSubmit={handleSubmit(async (values) => {
          await vaultKeysService.createKey(values);
          navigate("/");
        })}
      >
        <Input label="Name" className="mt-6" error={formState.errors.name?.message} {...register("name")} />
        <Input
          label="Description"
          className="mt-6"
          error={formState.errors.description?.message}
          {...register("description")}
        />
        <Input label="Value" className="mt-6" error={formState.errors.value?.message} {...register("value")} />

        <div className="flex flex-col gap-3 mt-5">
          <Button type="submit">Create</Button>
          <Button variant="outlinedDefault" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
