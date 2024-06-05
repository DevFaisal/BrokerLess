/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B1B12",
        secondary: "#3d405b",
        tertiary: "#003049",
        danger: "#d62828",
        success: "#57cc99",
        background: "#FBF5F1",
        backgroundOne: "#bc4749",
        backgroundTwo: "#52796f",
        backgroundThree: "#264653",
      },
    },
  },
  plugins: [],
};
