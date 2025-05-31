/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary': '#5F6FFF',
        'pink-custom': '#FB7CC9',
        'purple-custom': '#752AB8',
        'blue-custom': '#101B53', 
        'grey-custom': '#F4F4F4',
      }
    },
  },
  plugins: [],
}