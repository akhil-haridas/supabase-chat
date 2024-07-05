/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        '70': '70%',
      },
      minWidth: {
        '41': '41px',
        '500': '500px',
      },
    },
  },
  plugins: [],
}