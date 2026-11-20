import { useState } from "react";
import type { FormEvent } from "react";

import InputField from "./InputField";
import { validateForm } from "../services/validation";

import type {
  FormValues,
  FormFieldName,
} from "../types/form";

export default function SimpleForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
  });

  const [touched, setTouched] = useState<
    Partial<Record<FormFieldName, boolean>>
  >({});

  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  // Derived validation: no useEffect required
  const errors = validateForm(values);

  function handleChange(
    field: FormFieldName,
    value: string
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSuccess(false);
  }

  function handleBlur(field: FormFieldName) {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setSuccess(false);

    if (Object.keys(errors).length === 0) {
      setSuccess(true);
      console.log("Valid form:", values);
    }
  }

  return (
    <section className="form-container">
      <h1>Accessible Form Validation</h1>

      <p>All fields are required.</p>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="name"
          label="Full Name"
          type="text"
          autoComplete="name"
          value={values.name}
          error={
            touched.name || submitted
              ? errors.name
              : undefined
          }
          onChange={(value) =>
            handleChange("name", value)
          }
          onBlur={() => handleBlur("name")}
        />

        <InputField
          id="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          value={values.email}
          error={
            touched.email || submitted
              ? errors.email
              : undefined
          }
          onChange={(value) =>
            handleChange("email", value)
          }
          onBlur={() => handleBlur("email")}
        />

        <button type="submit">
          Submit
        </button>

        {submitted &&
          Object.keys(errors).length > 0 && (
            <p role="alert" className="error-message">
              Please correct the highlighted fields.
            </p>
          )}

        {success && (
          <p role="status" className="success-message">
            Form submitted successfully!
          </p>
        )}
      </form>
    </section>
  );
}