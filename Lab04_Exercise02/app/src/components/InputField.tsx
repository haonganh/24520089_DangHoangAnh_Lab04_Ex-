interface InputFieldProps {
  id: string;
  label: string;
  type: "text" | "email";
  value: string;
  error?: string;
  autoComplete: "name" | "email";
  onChange: (value: string) => void;
  onBlur: () => void;
}

export default function InputField({
  id,
  label,
  type,
  value,
  error,
  autoComplete,
  onChange,
  onBlur,
}: InputFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label} <span aria-hidden="true">*</span>
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />

      {error && (
        <p id={`${id}-error`} className="error-message">
          {error}
        </p>
      )}
    </div>
  );
}