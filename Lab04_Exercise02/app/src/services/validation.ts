import type { FormValues, FormErrors } from "../types/form";

export function validateName(name: string): string {
  if (!name.trim()) {
    return "Name is required.";
  }

  if (name.trim().length < 2) {
    return "Name must contain at least 2 characters.";
  }

  return "";
}

export function validateEmail(email: string): string {
  if (!email.trim()) {
    return "Email is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address.";
  }

  return "";
}

export function validateForm(
  values: FormValues
): FormErrors {
  const errors: FormErrors = {};

  const nameError = validateName(values.name);
  const emailError = validateEmail(values.email);

  if (nameError) {
    errors.name = nameError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  return errors;
}