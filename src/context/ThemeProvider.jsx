import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const CurrencyContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize state from localStorage with fallbacks
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      theme: 'light',
      currency: 'INR',
      language: 'en-IN',
      notifications: {
        monthly: false,
        budget: false
      }
    };
  });

  // Separate state for theme to ensure immediate UI updates
  const [activeTheme, setActiveTheme] = useState(settings.theme);

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      const themeToApply = settings.theme === 'system' 
        ? (mediaQuery.matches ? 'dark' : 'light')
        : settings.theme;
        
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(themeToApply);
      setActiveTheme(themeToApply);
    };

    // Initial theme setup
    updateTheme();

    // Listen for system theme changes
    mediaQuery.addEventListener('change', updateTheme);
    
    // Listen for manual theme changes
    const handleThemeChange = (e) => {
      const newTheme = e.detail.theme;
      setSettings(prev => ({ ...prev, theme: newTheme }));
      updateTheme();
    };
    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, [settings.theme]);

  // Handle currency formatting
  const formatCurrency = (amount) => {
    try {
      return new Intl.NumberFormat(settings.language, {
        style: 'currency',
        currency: settings.currency
      }).format(amount);
    } catch (error) {
      console.error('Currency formatting error:', error);
      return `${settings.currency} ${amount}`;
    }
  };

  // Handle settings changes
  useEffect(() => {
    const handleSettingsChange = (e) => {
      const newSettings = e.detail;
      setSettings(newSettings);
      localStorage.setItem('settings', JSON.stringify(newSettings));
    };

    window.addEventListener('settingsChange', handleSettingsChange);
    return () => window.removeEventListener('settingsChange', handleSettingsChange);
  }, []);

  // Sync settings with localStorage
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    window.dispatchEvent(new CustomEvent('settingsChange', { detail: newSettings }));
  };

  return (
    <ThemeContext.Provider value={{ 
      theme: activeTheme, 
      setTheme: (theme) => {
        window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
      }
    }}>
      <CurrencyContext.Provider value={{
        settings,
        updateSettings,
        formatCurrency,
        currency: settings.currency
      }}>
        {children}
      </CurrencyContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export const useCurrency = () => useContext(CurrencyContext);