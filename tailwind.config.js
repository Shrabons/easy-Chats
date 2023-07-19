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
        borderline: "#BDBDBD",
        primary: "#5F35F5",
        secondary: "#F5F5F5"
      },
      backgroundImage: {
        backgroundleft: "url('../public/images/bg-left.png')",
        backgroundright: "url('../public/images/bg-right.png')",
      }


    },
  },
  plugins: [],
}

