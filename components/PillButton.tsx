'use client';
import React from 'react';
import Link from 'next/link';
import './pillbutton.css';

interface PillButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const PillButton: React.FC<PillButtonProps> = ({
  children,
  href = '',
  className = '',
  onClick,
  size = 'medium',
}) => {
  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        className={`pill-button pill-button-${size} ${className}`}
        onClick={onClick}
      >
        {children}
        <span className="pill-button-shine"></span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`pill-button pill-button-${size} ${className}`}
      onClick={onClick}
    >
      {children}
      <span className="pill-button-shine"></span>
    </Link>
  );
};

export default PillButton;
