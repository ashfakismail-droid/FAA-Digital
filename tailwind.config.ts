import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "80rem" },
    },
    extend: {
      colors: {
        border: "rgb(var(--border) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
        },
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        brand: {
          50: "#EEEFFE",
          100: "#DFE2FD",
          200: "#C2C6FB",
          300: "#9DA0F7",
          400: "#7A78F0",
          500: "#5F5CE6",
          600: "#4B49D6",
          700: "#3F3CB4",
          800: "#35328C",
          900: "#2D2B6E",
          950: "#1C1B47",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(16 16 40 / 0.04), 0 8px 24px -8px rgb(16 16 40 / 0.08)",
        card: "0 1px 3px rgb(16 16 40 / 0.05), 0 16px 40px -16px rgb(16 16 40 / 0.12)",
        lifted: "0 2px 6px rgb(16 16 40 / 0.06), 0 32px 64px -24px rgb(16 16 40 / 0.18)",
        glow: "0 0 0 1px rgb(95 92 230 / 0.25), 0 8px 32px -8px rgb(95 92 230 / 0.45)",
        "inner-line": "inset 0 1px 0 0 rgb(255 255 255 / 0.06)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(40px, -30px) scale(1.1)" },
          "66%": { transform: "translate(-30px, 20px) scale(0.95)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "marquee-fast": "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 48s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
