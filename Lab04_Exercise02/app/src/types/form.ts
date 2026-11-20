export interface FormValues {
  name: string;
  email: string;
}

export type FormErrors = Partial<
  Record<keyof FormValues, string>
>;

export type FormFieldName = keyof FormValues;
