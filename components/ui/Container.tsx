/**
 * Container Component - Responsive container for consistent layout
 *
 * Usage:
 * ```tsx
 * <Container maxWidth="lg" padding>
 *   <Section>
 *     <Section.Title>Title</Section.Title>
 *     <Section.Content>Content</Section.Content>
 *   </Section>
 * </Container>
 * ```
 */

import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = true,
  className = '',
}) => {
  return (
    <div
      className={`
        ${styles.container}
        ${styles[maxWidth]}
        ${padding ? styles.padding : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
