import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define types for our theme context
type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

// Create theme context with default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize with light theme by default
  const [theme, setTheme] = useState<ThemeType>('light');

  // Use useEffect to safely access localStorage (client-side only)
  useEffect(() => {
    // Check for user's preferred color scheme
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    // Check if theme preference exists in localStorage after component has mounted
    const savedTheme = localStorage.getItem('theme') as ThemeType;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      // Use system preference if no saved theme
      setTheme('dark');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Update localStorage and apply theme class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);

    // Apply dark-theme class to body element
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
