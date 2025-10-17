// src/hooks/usePrefersDarkMode.js

import { useEffect, useState } from 'react';

const usePrefersDarkMode = () => {
  const [prefersDark, setPrefersDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDark(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersDark;
};

export default usePrefersDarkMode;
