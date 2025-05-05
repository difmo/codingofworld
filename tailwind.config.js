/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        transform: "transform",
      },
      translate: {
        full: "100%",
      },
      // dfdf
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        play: ["Play", "sans-serif"],
        anek_telugu: ['"Anek Telugu"', "sans-serif"], // Custom Anek Telugu font
        // Add Play font here
      },
      colors: {
        primary: "#FF4F43",
        secondary: "#eb4034",
        secondaryblue: "#273d6b",
        light: "#f7f7f7",
        dark: "#111827",
        dark2: "#999999",
        customBlue: "#4f46e5",
        customPink: "#ec4899",
        grey: "e6e7e8",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #4f46e5, #ec4899)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [function ({ addUtilities }) {
    addUtilities({
      ".scrollbar-thin": {
        "scrollbar-width": "thin",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
      },
      ".scrollbar-primary": {
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "theme('colors.primary')",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "theme('colors.gray.200')",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "theme('colors.primary.700')",
        },
      },
      ".scrollbar-dark": {
        "&::-webkit-scrollbar-track": {
          backgroundColor: "theme('colors.gray.800')",
        },
      },
    });
  },],
};
