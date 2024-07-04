/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        '70': '70%',  // Custom max-height value
      },
      minWidth: {
        '41': '41px',  // Custom max-height value
      },
    },
  },
  plugins: [],
}