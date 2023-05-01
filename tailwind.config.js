/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        open: ['Open Sans', 'sans-serif'],
      },
      colors: {
        heading: "#11175D",
        borderline: "#B8B9CE",
        primary: "#5F35F5",
      }


    },
  },
  plugins: [],
}

