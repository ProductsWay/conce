/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: "media", // or 'media' or 'class'
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("daisyui")],
};
