import React, { InputHTMLAttributes } from 'react';
import './styles/Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  fullWidth?: boolean;
  roundedTop?: boolean;
  roundedBottom?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  fullWidth = true,
  roundedTop = false,
  roundedBottom = false,
  className = '',
  ...props
}) => {
  const inputClasses = [
    'custom-input',
    fullWidth ? 'full-width' : '',
    roundedTop ? 'rounded-top' : '',
    roundedBottom ? 'rounded-bottom' : '',
    error ? 'input-error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-container">
      <input
        id={id}
        className={inputClasses}
        aria-invalid={!!error}
        placeholder=" "
        {...props}
      />
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
};

export default Input;
