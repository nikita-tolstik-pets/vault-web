/** @type {import('tailwindcss').Config} */

import { importCSS } from "./scripts/importCSS.js";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: 'Onest, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",
      dark: {
        900: "#101010",
        800: "#1B1B1B",
        700: "#313131",
        600: "#424242",
        500: "#525252",
        400: "#757575",
        300: "#979797",
        200: "#BABABA",
        100: "#DCDCDC",
      },
      red: {
        900: "#2E0308",
        800: "#5B0711",
        700: "#890A19",
        600: "#B60E22",
        500: "#E4112A",
        400: "#E94155",
        300: "#EF707F",
        200: "#F4A0AA",
        100: "#FACFD4",
      },
    },
    fontSize: {
      h1: "60px",
      h2: "48px",
      h3: "40px",
      h4: "30px",
      h5: "28px",
      h6: "24px",
      lg: "18px",
      md: "16px",
      sm: "14px",
      xs: "12px",
    },
    borderRadius: {
      0: "0",
      2: "2px",
      4: "4px",
      8: "8px",
      12: "12px",
      16: "16px",
      24: "24px",
      32: "32px",
      full: "9999px",
    },
    spacing: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
      12: "12px",
      14: "14px",
      16: "16px",
      20: "20px",
      24: "24px",
      28: "28px",
      32: "32px",
      36: "36px",
      40: "40px",
      44: "44px",
      48: "48px",
      56: "56px",
      64: "64px",
      80: "80px",
      96: "96px",
      100: "100px",
      120: "120px",
      240: "240px",
      320: "320px",
    },
    extend: {},
  },

  plugins: [importCSS("./src/index.css")],
};