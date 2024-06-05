/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#006494",
        secondary: "#023e8a",
        tertiary: "#003049",
        danger: "#d62828",
        success: "#57cc99",
      },
    },
  },
  plugins: [],
};
