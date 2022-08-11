/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b4ff13",
      },
      flexGrow: {
        2: 2,
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
