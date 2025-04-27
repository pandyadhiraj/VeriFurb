module.exports = {
  darkMode: "class", // Enable dark mode globally based on the 'dark' class on HTML
  theme: {
    extend: {
      colors: {
        "gray-900": "#1a202c", // Dark mode background color
        "indigo-600": "#4c51bf", // Indigo button color
        "indigo-800": "#2b6cb0", // Darker indigo button hover color
      },
      fontFamily: {
        sans: ["Enriqueta", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
