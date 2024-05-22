import { useFormState } from "react-hook-form";
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

type FormProps = {
  defaultValues: Partial<FormValues>;
  onSave(values: FormValues): void;
  onCancel(): void;
  onDelete(): void;
};

export default function Form({ onDelete, onSave, onCancel, defaultValues }: FormProps) {
  const { handleSubmit, register, control } = useForm<FormValues>({
    validationSchema,
    defaultValues,
  });

  const { isValid, isDirty, errors } = useFormState<FormValues>({
    control,
  });

  const canBeSaved = isDirty && isValid;

  return (
    <form className="w-full" onSubmit={handleSubmit(onSave)}>
      <Input label="Name" className="mt-6" error={errors.name?.message} {...register("name")} />
      <Input label="Description" className="mt-6" error={errors.description?.message} {...register("description")} />
      <Input label="Value" className="mt-6" error={errors.value?.message} {...register("value")} />

      <div className="flex flex-col gap-3 mt-5">
        <Button type="submit" disabled={!canBeSaved}>
          Save
        </Button>
        <Button variant="outlinedDefault" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="outlinedError" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </form>
  );
}
