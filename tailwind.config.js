/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f4f1ff',
          100: '#ebe4ff',
          200: '#d3c2ff',
          300: '#b498fd',
          400: '#9a72fb',
          500: '#8354f7',
          600: '#6c3ff0',
          700: '#5c2fd6',
          800: '#4b26ac',
          900: '#3b1f85',
        },
        ink: {
          900: '#1a1c2e',
          700: '#3a3d55',
          500: '#6b7089',
          400: '#8a8fa8',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(26, 28, 46, 0.04), 0 8px 24px -8px rgba(26, 28, 46, 0.06)',
      },
    },
  },
  plugins: [],
}
