/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#264653",
        secondary: "#3a5a40",
        tertiary: "#003049",
        danger: "#d62828",
        success: "#0582ca",
      },
    },
  },
  plugins: [],
};
