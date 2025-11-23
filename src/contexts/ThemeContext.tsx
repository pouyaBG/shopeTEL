import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  error: string;
  success: string;
  warning: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  setColors: (colors: Partial<ThemeColors>) => void;
  resetColors: () => void;
}

const defaultColors: ThemeColors = {
  primary: '#667eea',
  primaryDark: '#5568d3',
  secondary: '#764ba2',
  accent: '#f093fb',
  background: '#f9fafb',
  surface: '#ffffff',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colors, setColorsState] = useState<ThemeColors>(() => {
    const savedColors = localStorage.getItem('theme-colors');
    return savedColors ? { ...defaultColors, ...JSON.parse(savedColors) } : defaultColors;
  });

  useEffect(() => {
    localStorage.setItem('theme-colors', JSON.stringify(colors));

    // اعمال رنگ‌ها به CSS Variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-dark', colors.primaryDark);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-error', colors.error);
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-warning', colors.warning);
  }, [colors]);

  const setColors = (newColors: Partial<ThemeColors>) => {
    setColorsState((prev) => ({ ...prev, ...newColors }));
  };

  const resetColors = () => {
    setColorsState(defaultColors);
  };

  return (
    <ThemeContext.Provider value={{ colors, setColors, resetColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
