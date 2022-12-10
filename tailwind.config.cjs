/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./index.html"
  ],
  corePlugins:{
    preflight: true,
  }
  ,
  theme: {
    extend: {},
  },
  plugins: [],
}
