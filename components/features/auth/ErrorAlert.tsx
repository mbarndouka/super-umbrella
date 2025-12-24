import React from 'react';
import './styles/ErrorAlert.css';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  if (!message) return null;

  return <div className="error-alert">{message}</div>;
};

export default ErrorAlert;
