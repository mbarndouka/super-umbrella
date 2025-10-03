'use client';

import React, { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="theme__toggle"
      onClick={toggleTheme}
      aria-label={
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      }
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon size={20} strokeWidth={2} />
      ) : (
        <Sun size={20} strokeWidth={2} />
      )}
    </button>
  );
};

export default ThemeToggle;
