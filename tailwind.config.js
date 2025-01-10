/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.js", "./templates/**/*.html.twig"],
  theme: {
    extend: {
      fontFamily: {
        GillSans: "var(--font-gill)",
        Mitra: "var(--font-mitra)",
        Kanit: "var(--font-kanit)",
        Jaro: "var(--font-jaro)",
      },
      fontWeight: {
        medium: 500,
        sem: 600,
        bold: 700,
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
    },
  },
  plugins: [],
};
