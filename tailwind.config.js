/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // define your custom font
      sans: ["Inter var", "sans-serif"],
    },
    capsize: {
      fontMetrics: {
        // define font metrics for your custom font from Capsize's website
        sans: {
          capHeight: 2048,
          ascent: 2728,
          descent: -680,
          lineGap: 0,
          unitsPerEm: 2816,
        },
      },
      // define the utility class for trimming (leave empty to trim all text nodes)
      className: "capsize",
    },
    extend: {},
  },

  daisyui: {
    themes: ["dracula"],
  },
  plugins: [require("daisyui"), require("@themosaad/tailwindcss-capsize")],
}
