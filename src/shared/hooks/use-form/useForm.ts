import * as HookForm from "react-hook-form";
import * as Yup from "yup";

const yupResolver =
  <TFieldValues extends HookForm.FieldValues = HookForm.FieldValues>(
    validationSchema: Yup.ObjectSchema<TFieldValues>
  ) =>
  async (data: any) => {
    try {
      const values = await validationSchema.validate(data, {
        abortEarly: false,
      });

      return {
        values,
        errors: {},
      };
    } catch (errors: any) {
      return {
        values: {},
        errors: errors.inner.reduce(
          (allErrors: any, currentError: any) => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type ?? "validation",
              message: currentError.message,
            },
          }),
          {}
        ),
      };
    }
  };

type UseFormProps<TFieldValues extends HookForm.FieldValues = HookForm.FieldValues, TContext = any> = {
  validationSchema?: Yup.ObjectSchema<TFieldValues>;
} & HookForm.UseFormProps<TFieldValues, TContext>;

export default function useForm<TFieldValues extends HookForm.FieldValues = HookForm.FieldValues, TContext = any>({
  validationSchema,
  ...rest
}: UseFormProps<TFieldValues, TContext> = {}) {
  return HookForm.useForm<TFieldValues, TContext>({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    mode: "onSubmit",
    ...rest,
  });
}
