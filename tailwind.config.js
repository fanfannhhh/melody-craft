module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8ff',
          100: '#e8edff',
          200: '#cdd8ff',
          300: '#a4b6ff',
          400: '#7a8cff',
          500: '#4f5ffe',
          600: '#353ede',
          700: '#272fb0',
          800: '#202789',
          900: '#1c226c',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 20px 60px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
};

