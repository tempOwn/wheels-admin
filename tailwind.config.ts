import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./modules/**/*.{ts,tsx}",
    "./layout/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "420px",
        "3xl": "1600px",
      },
    },
    extend: {
      colors: {
        "wheels-error": "var(--wheels-error)",
        "wheels-primary": "var(--wheels-primary)",
        "wheels-secondary": "var(--wheels-secondary)",
        "wheels-purple": "var(--wheels-purple)",
        "wheels-grey": "var(--wheels-grey)",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        mlg: "10px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
        "5xl": "28px",
        "6xl": "32px",
        100: "100px",
      },
      fontSize: {
        10: ["10px", "12px"],
        11: ["11px", "14px"],
        13: ["13px", "16px"],
        15: ["15px", "18px"],
        22: ["22px", "28px"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
