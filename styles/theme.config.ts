/**
 * Theme Configuration - TypeScript
 * Provides type-safe access to theme tokens
 */

export const theme = {
  // Colors
  colors: {
    primary: {
      title: 'var(--title-color)',
      titleDark: 'var(--title-color-dark)',
      text: 'var(--text-color)',
      body: 'var(--body-color)',
      container: 'var(--container-color)',
    },
    accent: {
      first: 'var(--first-color)',
      firstAlt: 'var(--first-color-alt)',
    },
    semantic: {
      error: 'var(--error-color)',
      success: 'var(--success-color)',
      warning: 'var(--warning-color)',
      info: 'var(--info-color)',
    },
    state: {
      border: 'var(--border-color)',
      link: 'var(--link-color)',
      muted: 'var(--muted-text)',
    },
    dashboard: {
      primary: 'var(--dashboard-primary)',
      secondary: 'var(--dashboard-secondary)',
      background: 'var(--dashboard-background)',
      text: 'var(--dashboard-text)',
      textLight: 'var(--dashboard-text-light)',
      border: 'var(--dashboard-border)',
      active: 'var(--dashboard-active)',
      hover: 'var(--dashboard-hover)',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      body: 'var(--body-font)',
    },
    fontSize: {
      big: 'var(--big-font-size)',
      h1: 'var(--h1-font-size)',
      h2: 'var(--h2-font-size)',
      h3: 'var(--h3-font-size)',
      normal: 'var(--normal-font-size)',
      small: 'var(--small-font-size)',
      smaller: 'var(--smaller-font-size)',
      tiny: 'var(--tiny-font-size)',
    },
    fontWeight: {
      normal: 'var(--font-normal)',
      medium: 'var(--font-medium)',
      semiBold: 'var(--font-semi-bold)',
    },
  },

  // Spacing
  spacing: {
    '0-25': 'var(--mb-0-25)',
    '0-5': 'var(--mb-0-5)',
    '0-75': 'var(--mb-0-75)',
    1: 'var(--mb-1)',
    '1-5': 'var(--mb-1-5)',
    2: 'var(--mb-2)',
    '2-5': 'var(--mb-2-5)',
    3: 'var(--mb-3)',
  },

  // Border Radius
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    full: 'var(--radius-full)',
  },

  // Shadows
  shadows: {
    sm: 'var(--shadow-sm)',
    base: 'var(--shadow-base)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  },

  // Z-Index
  zIndex: {
    tooltip: 'var(--z-tooltip)',
    fixed: 'var(--z-fixed)',
    modal: 'var(--z-modal)',
  },

  // Transitions
  transitions: {
    fast: 'var(--transition-fast)',
    base: 'var(--transition-base)',
    slow: 'var(--transition-slow)',
  },
} as const;

// Type exports for autocomplete
export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography;
export type ThemeSpacing = typeof theme.spacing;

// Helper function to get CSS variable value
export const getCSSVar = (varName: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(varName);
  }
  return '';
};

// Helper to set CSS variable
export const setCSSVar = (varName: string, value: string): void => {
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty(varName, value);
  }
};
