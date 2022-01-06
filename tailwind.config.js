const forms = require("@tailwindcss/forms");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,

      gray: colors.coolGray,
      blue: colors.sky,
      red: colors.red,
      yellow: colors.yellow,
      green: colors.green,
    },
    minHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [forms],
};
