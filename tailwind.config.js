module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
      goudy: ['Goudy Old Style', 'Georgia', 'serif']  // Adding fallback fonts
    },
      colors: {
        'green': {
          100: '#E7F8E7',
          200: '#C5ECC5',
          300: '#9EDE9E',
          400: '#76D076',
          500: '#4EC24E',
          600: '#2B992B',
          700: '#1C661C',
        },
        'gray': {
          50: '#FAFAFA',
          100: '#F4F4F5',
          800: '#27272A',
          900: '#18181B',
        }
      }
    }
  },
  plugins: [],
}