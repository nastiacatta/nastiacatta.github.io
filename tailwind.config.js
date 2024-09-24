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
        'dark-grey': '#2d2d2d',  // Define dark-grey color
      },
    },
  },
  plugins: [],
};
