/**
 * Card Component - Reusable composition pattern for card-based layouts
 *
 * Usage:
 * ```tsx
 * <Card variant="default" hover>
 *   <Card.Header>
 *     <Card.Title>Title</Card.Title>
 *   </Card.Header>
 *   <Card.Content>Content here</Card.Content>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 * ```
 */

import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  hover?: boolean;
  className?: string;
}

interface CardSubComponents {
  Header: React.FC<{ children: React.ReactNode; className?: string }>;
  Title: React.FC<{ children: React.ReactNode; className?: string }>;
  Subtitle: React.FC<{ children: React.ReactNode; className?: string }>;
  Content: React.FC<{ children: React.ReactNode; className?: string }>;
  Footer: React.FC<{ children: React.ReactNode; className?: string }>;
  Image: React.FC<{ src: string; alt: string; className?: string }>;
}

const Card: React.FC<CardProps> & CardSubComponents = ({
  children,
  variant = 'default',
  hover = false,
  className = '',
}) => {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${hover ? styles.hover : ''} ${className}`}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, className = '' }) => (
  <div className={`${styles.cardHeader} ${className}`}>{children}</div>
);

Card.Title = ({ children, className = '' }) => (
  <h3 className={`${styles.cardTitle} ${className}`}>{children}</h3>
);

Card.Subtitle = ({ children, className = '' }) => (
  <p className={`${styles.cardSubtitle} ${className}`}>{children}</p>
);

Card.Content = ({ children, className = '' }) => (
  <div className={`${styles.cardContent} ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`${styles.cardFooter} ${className}`}>{children}</div>
);

Card.Image = ({ src, alt, className = '' }) => (
  <div className={`${styles.cardImage} ${className}`}>
    <img src={src} alt={alt} />
  </div>
);

export default Card;
