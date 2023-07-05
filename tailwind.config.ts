import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        mongoose: "#b4a188",
        sulu: "#96ed89",
        charade: "#262734",
        logCabin: "#151613",
      },
    },
  },
  plugins: [],
} satisfies Config;
