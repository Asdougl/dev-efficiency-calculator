/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Atkinson Hyperlegible", "sans-serif"],
      serif: ["Playfair Display", "serif"],
      mono: ["Fira Code", "monospace"],
    },
  },
  plugins: [],
};
