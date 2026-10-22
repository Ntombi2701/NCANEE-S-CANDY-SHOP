/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        candy: {
          pink: '#f5809d',
          purple: '#9a78d3',
          yellow: '#f7d76b',
          cream: '#fff8f5',
          ink: '#30233a',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
