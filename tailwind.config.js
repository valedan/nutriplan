const forms = require("@tailwindcss/forms");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,

      gray: colors.gray,
      blue: colors.sky,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
    },
    minHeight: {
      0: "0",
      "1/4": "25vh",
      "1/2": "50vh",
      "3/4": "75vh",
      full: "100vh",
    },
    maxHeight: {
      0: "0",
      "1/4": "25vh",
      "1/2": "50vh",
      "3/4": "75vh",
      full: "100vh",
    },
    extend: {},
  },
  plugins: [forms],
};
