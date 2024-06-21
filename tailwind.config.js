/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./html/*.html", "./scripts/*.js", "index.html", "404.html"],
  theme: {
    colors: {
      white: {
        DEFAULT: "rgba(255, 255, 255)",
        light: "rgba(255, 255, 255, 0.5)",
      },
      black: "#0D080E",
      red: "#d55130",
      blue: "#628bb3",
      green: "#826a0d",
      yellow: "#e3a327",
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "Inter", "Arial", "sans-serif"],
      },
      content: {
        arrow: '" →"',
      },
      backgroundImage: {
        lines: 'url("/assets/line-distortions-4-transparentcolours.png")',
      },
    },
    keyframes: {
      "slide-right": {
        to: { transform: "translateX(10px)" },
      },
      glint: {
        "0%": {
          "background-image":
            "linear-gradient(90deg, rgba(243,243,243,1) 0%, rgba(255,255,255,0.5) 19%, rgba(255,255,255,1) 41%)",
          "background-size": "400% 400%",
          "background-position": "-50px 0",
        },
        "30%": {
          "background-image":
            "linear-gradient(90deg, rgba(243,243,243,1) 0%, rgba(255,255,255,0.5) 19%, rgba(255,255,255,1) 41%)",
          "background-size": "400% 400%",
          "background-position": "100px 0",
        },
        "100%": {
          "background-image":
            "linear-gradient(90deg, rgba(243,243,243,1) 0%, rgba(255,255,255,0.5) 19%, rgba(255,255,255,1) 41%)",
          "background-size": "400% 400%",
          "background-position": "100px 0",
        },
      },
    },
    animation: {
      "point-right": "slide-right 1s infinite alternate ease-in",
      glint: "glint 2s infinite ease-in-out",
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          highlight: (value) => ({
            "background-image": `linear-gradient(to top, ${value}  50%, transparent 50%);`,
          }),
        },
        { values: theme("colors") },
      );
    }),
  ],
};

//npx tailwindcss -i ./styles/styles.css -o ./styles/main.css --watch
