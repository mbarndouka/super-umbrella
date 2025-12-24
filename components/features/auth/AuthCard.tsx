import React, { ReactNode } from 'react';
// import Link from 'next/link';
import './styles/AuthCard.css';

interface AuthCardProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="auth-card">
      <div className="auth-decoration"></div>
      <div className="auth-header">
        <h2 className="auth-title">{title}</h2>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export default AuthCard;
