module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'system-ui', 'sans-serif'],
        'dm-sans': ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        'pink-primary': '#f060b4',
        'pink-light': '#ff99d1',
        'pink-soft': '#ffd0e8',
        'pink-pale': '#ffe8f5',
        'dark-bg': '#0d0a0f',
        'dark-surface': '#18141c',
        'lilac': '#b19cd9',
      },
      transitionTimingFunction: {
        'motion': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        'motion-out': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
    },
  },
  plugins: [],
};
