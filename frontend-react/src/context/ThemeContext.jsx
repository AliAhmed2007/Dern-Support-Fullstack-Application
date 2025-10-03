import { createContext, useEffect, useState } from 'react';
import useUserProfile from '../hooks/useUserProfile';

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const { userProfile, userProfileDispatch } = useUserProfile();

  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme !== null) {
      return storedTheme === 'true';
    }
    return userProfile?.preferences?.darkMode ?? false;
  });

  useEffect(() => {
    if (userProfile?.preferences?.darkMode !== undefined) {
      setDarkMode(userProfile.preferences.darkMode);
    }
  }, [userProfile?.preferences]);

  darkMode
    ? document.documentElement.classList.add('bg-dark-background', 'text-dark-primary')
    : document.documentElement.classList.remove('bg-dark-background', 'text-dark-primary')
  function toggleTheme(dark) {
    setDarkMode(dark);
    const root = document.documentElement;
    root.classList.remove(
      'bg-light-background',
      'text-light-primary',
      'bg-dark-background',
      'text-dark-primary'
    );
    if (dark) {
      root.classList.add('bg-dark-background', 'text-dark-primary');
    } else {
      root.classList.add('bg-light-background', 'text-light-primary');
    }
  }

  useEffect(() => {
    userProfileDispatch({ type: 'ADD_PREFERENCES', payload: { darkMode } });
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode, userProfileDispatch]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
