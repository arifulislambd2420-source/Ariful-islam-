/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Palette that swaps with light/dark mode (driven by CSS vars in index.css)
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        border: "rgb(var(--c-border) / <alpha-value>)",

        // Brand colors — same in both modes
        navy: "#0F1E3D",
        primary: "#2563EB",
        cyan: "#22D3EE",

        // Dark-panel helpers (used on navy hero/footer regardless of mode)
        "navy-2": "#152A55",
        "on-navy": "#E6ECF7",
        "on-navy-muted": "#93A3C4",
      },
      fontFamily: {
        display: ['"Poppins"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cta-gradient": "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
        "cta-gradient-hover":
          "linear-gradient(135deg, #1D4ED8 0%, #06B6D4 100%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 21, 38, 0.04), 0 8px 24px -12px rgba(11, 21, 38, 0.10)",
        "card-hover":
          "0 4px 12px rgba(11, 21, 38, 0.06), 0 20px 40px -16px rgba(37, 99, 235, 0.20)",
        glow: "0 10px 30px -10px rgba(34, 211, 238, 0.45)",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
