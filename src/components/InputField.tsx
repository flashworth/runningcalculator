import type { ReactNode } from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error: string | null;
  id: string;
  unitToggle?: ReactNode;
}

export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  error,
  id,
  unitToggle,
}: InputFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="input-field">
      <label className="input-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="input-field__wrapper">
        <input
          type="text"
          id={id}
          className={`input-field__input${error ? ' input-field__input--error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode="decimal"
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        {unitToggle}
      </div>
      {error && (
        <span id={errorId} className="input-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
