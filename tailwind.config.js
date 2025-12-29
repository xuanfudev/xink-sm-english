/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand color scale updated to green range based on #67B73F (Ivy's English Center)
        brand: {
          50: '#F3F9ED',
          100: '#E5F2D8',
          200: '#CCE5B4',
          300: '#A9D37F',
          400: '#8BC95C',
          500: '#67B73F', // primary - Ivy's green
          600: '#539832',
          700: '#407828',
          800: '#335F23',
          900: '#2B4E21',
        },
      },
      boxShadow: { soft: '0 10px 30px -12px rgba(103,183,63,.25)' },
    },
  },
  plugins: [],
};
