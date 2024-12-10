/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.js", "./templates/**/*.html.twig"],
  theme: {
    extend: {
      fontFamily: {
        futuraMedium: ["FuturaMedium", "sans-serif"],
        FuturaMediumCondensed: ["FuturaMediumCondensed", "sans-serif"],
        futuraLight: ["FuturaLight", "sans-serif"],
        futuraBold: ["FuturaBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
