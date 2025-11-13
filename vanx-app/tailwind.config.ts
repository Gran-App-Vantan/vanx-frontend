import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const config: Config = {
  future: {
    useClassicEngine: true,
  },
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      white: "var(--color-white)",
    },
    extend: {},
  },
  plugins: [],
};

export default config;
