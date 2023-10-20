/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'pops': ['Poppins', 'sans-serif'],
        'sans': ['Open Sans', 'sans-serif'],
      },
      colors:{
        'primary': '#5F35F5',
        'overlay': 'rgba(0, 0, 0, 0.41)'
      }
    },
  },
  plugins: [],
}