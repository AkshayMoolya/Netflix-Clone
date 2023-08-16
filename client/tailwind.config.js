/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],

  utilities: {
    ".custom-shadow": {
      "box-shadow": "rgba(0, 0, 0, 0.75) 0px 3px 10px",
    },
  },
};
