/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'mobile-screen': '480px', // Adjust the breakpoint as needed
      },
    },
  },
  plugins: []
}
