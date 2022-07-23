/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFA099",
        secondary: "#ffffb3",
        tertiary: "#b0e7fd"
      },
      animation: {
        'wave': 'wave 4s ease-in infinite',
      },
      keyframes: {
        wave: {
         '0%': { transform: 'rotate(0.0deg)' },
         '10%': { transform: 'rotate(14.0deg) '},  
         '20%': { transform: 'rotate(-8.0deg)' },
         '30%': { transform: 'rotate(10.0deg) '},
         '40%': { transform: 'rotate(0.0deg)' },
         '50%': { transform: 'rotate(0.0deg) '},
         '60%': { transform: 'rotate( 0.0deg)' },  
         '100%': { transform: 'rotate( 0.0deg)' },
        }
      }
    },
    fontFamily: {
      sans: "Outfit, ui-sans-serif, system-ui",
      link: "Sacramento, cursive"
    }
  },
  plugins: [],
}
