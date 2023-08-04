/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        dark: "#0b1221",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "fade-out": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        "fade-down": {
          "0%": {
            transform: "translateY(-20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
        "fade-up": {
          "0%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(-20px)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
