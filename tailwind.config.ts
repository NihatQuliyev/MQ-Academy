import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#EE6A1A",
          deep:    "#C44E0C",
          "2":     "#F38440",
          soft:    "#FDDEC8",
          tint:    "#FFF1E6",
        },
        ink: {
          DEFAULT: "#16110D",
          "2":     "#2A211B",
          "3":     "#4A3F36",
        },
        cream: {
          DEFAULT: "#FAF6EF",
          "2":     "#F1ECE2",
        },
        paper:   "#FAFAF8",
        muted:   "#78716C",
        brand: {
          green:       "#15803D",
          "green-soft": "#DCFCE7",
          red:         "#B91C1C",
          "red-soft":  "#FEE2E2",
          blue:        "#1D4ED8",
          "blue-soft": "#DBEAFE",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 3px rgba(22,17,13,0.06), 0 1px 2px rgba(22,17,13,0.04)",
        md: "0 4px 16px rgba(22,17,13,0.08), 0 2px 4px rgba(22,17,13,0.04)",
        lg: "0 12px 40px rgba(22,17,13,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
