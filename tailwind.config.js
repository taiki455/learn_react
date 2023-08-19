/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cute: ["Quicksand", "sans-serif"],
      },
      colors: {
        pink: "#F687B3",
        purple: "#9F7AEA",
        teal: "#4FD1C5",
        yellow: "#F6E05E",
      },
    },
  },
  plugins: [],
};
