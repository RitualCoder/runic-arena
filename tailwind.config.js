/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.js", "./templates/**/*.html.twig"],
  theme: {
    extend: {
      fontFamily: {
        GillSans: ["GillSans", "sans-serif"],
        GillSansCn: ["GillSansCn", "sans-serif"],
      },
      fontWeight: {
        medium: 500,
        sem: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
};
