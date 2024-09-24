// tailwind.config.js

module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-pink': '#F9E0E7',
        'dark-grey': '#2d2d2d',
        'lilac': '#b19cd9',
      },
    },
  },
  plugins: [],
};
