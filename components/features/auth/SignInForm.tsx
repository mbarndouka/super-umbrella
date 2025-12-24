import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import Checkbox from './Checkbox';
import ErrorAlert from './ErrorAlert';
import './styles/AuthForms.css';

interface SignInFormProps {
  onSuccess?: () => void;
}

const SignInForm: React.FC<SignInFormProps> = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TODO: Implement authentication
    setError('Authentication not yet implemented');
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <ErrorAlert message={error} />

      <div className="form-group">
        <Input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          label="Email address"
          roundedTop
        />

        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          roundedBottom
        />
      </div>

      <div className="form-actions">
        <Checkbox
          id="remember-me"
          name="rememberMe"
          label="Remember me"
          checked={formData.rememberMe}
          onChange={handleChange}
        />

        <div className="forgot-password">
          <a href="/auth/forgot-password">Forgot your password?</a>
        </div>
      </div>

      <div className="form-submit">
        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
