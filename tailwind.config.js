/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#6366F1",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        bg: "#F7F9FC",
        card: "#FFFFFF",
        ink: "#111827",
        muted: "#6B7280",
        dark: {
          bg: "#0F1115",
          card: "#171A21",
          border: "#262B36",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "24px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(17, 24, 39, 0.06)",
        softer: "0 2px 12px rgba(17, 24, 39, 0.04)",
        lift: "0 12px 32px rgba(17, 24, 39, 0.12)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
        "brand-gradient": "linear-gradient(135deg, #3B82F6, #6366F1)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};
