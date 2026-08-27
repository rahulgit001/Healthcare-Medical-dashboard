/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#159A9C",
        secondary: "#12304A",
        success: "#3AA981",
        warning: "#E9A23B",
        danger: "#D95C5C",
        bg: "#F5F7FA",
        card: "#FFFFFF",
        ink: "#17212B",
        muted: "#6B7785",
        dark: {
          bg: "#0F172A",
          card: "#17212B",
          border: "#273548",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "Manrope", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 4px 16px rgba(18, 48, 74, 0.06)",
        softer: "0 2px 8px rgba(18, 48, 74, 0.04)",
        lift: "0 8px 24px rgba(18, 48, 74, 0.12)",
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
