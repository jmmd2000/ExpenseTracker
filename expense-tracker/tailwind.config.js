/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from "tailwind-scrollbar";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbarPlugin({
      nocompatible: true,
    }),
  ],
};
