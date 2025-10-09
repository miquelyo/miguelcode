// tailwind.config.js

// BARU: Impor daisyui di bagian atas menggunakan sintaks 'import'
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // DIUBAH: Gunakan variabel daisyui di sini, bukan require()
  plugins: [daisyui],
}