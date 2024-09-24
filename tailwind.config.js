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
        'light-pink': '#F9E0E7', // Define light-pink color
        'dark-grey': '#1a1a1a',  // Define dark-grey color
        'lilac': '#b19cd9',       // Define lilac color
      },
      rotate: {
        '3': '3deg',
        '-3': '-3deg',
      },
      translate: {
        '1': '0.25rem',
      },
    },
  },
  plugins: [],
};
