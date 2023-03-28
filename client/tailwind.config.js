/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'azul-escuro': '#3868B0',
        'azul-claro': '#BAD7E9',
        'rosa-escuro': '#EB455F',
        'rosa-claro': '#F4D2DA',
        'branco-fundo': '#FDFAFB',
        'cinza-claro': '#ECE8EA',
        'cinzinha': '#F4F3F3',
      }
    },
  },
  plugins: [],
}
