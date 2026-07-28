import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff4ed",
          100: "#ffe6d5",
          500: "#ee6c2f",
          600: "#d8551c",
          700: "#b34317",
        },
      },
    },
  },
  plugins: [],
};
export default config;