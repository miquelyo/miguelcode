// tailwind.config.js
import daisyui from "daisyui";

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  // DIUBAH: Tambahkan konfigurasi tema daisyUI
  plugins: [daisyui],
  daisyui: {
    themes: ["dark", {
      mytheme: {
        "primary": "#2dd4bf", // Warna Teal
        "secondary": "#f6d860",
        "accent": "#37cdbe",
        "neutral": "#3d4451",
        "base-100": "#ffffff",
      },
    }],
  },
}