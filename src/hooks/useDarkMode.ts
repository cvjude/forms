import { useEffect, useState } from 'react';

export const useDarkMode = (): { isDarkMode: string | boolean } => {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : ''
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          setIsDarkMode(e.matches);
        });
    }
  }, []);

  return { isDarkMode };
};
