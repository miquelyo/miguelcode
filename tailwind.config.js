// tailwind.config.js
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Ganti 'Inter' menjadi 'Poppins' di sini
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
}