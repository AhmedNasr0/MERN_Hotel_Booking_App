/** @type {import('tailwindcss').Config} */
export default {
  content: ["/./index.html","./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {},
    container:{
      padding:{
        xl:"9rem"
      },
    }
  },
  plugins: [],
}

