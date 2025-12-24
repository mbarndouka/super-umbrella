import React, { InputHTMLAttributes } from 'react';
import './styles/Checkbox.css';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  id: string;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="checkbox-container">
      <div className="checkbox-input-wrapper">
        <input
          id={id}
          type="checkbox"
          className={`custom-checkbox ${className} ${
            error ? 'checkbox-error' : ''
          }`}
          aria-invalid={!!error}
          {...props}
        />
        <label htmlFor={id} className="checkbox-label">
          {label}
        </label>
      </div>
      {error && <div className="checkbox-error-message">{error}</div>}
    </div>
  );
};

export default Checkbox;
