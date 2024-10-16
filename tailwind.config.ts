import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          5: "#fdf2f8", //pink 50
          10: "#fce7f3", // pink 100
          15: "#fbcfe8", //pink 200
          20: "#f9a8d4", //pink 300
          25: "#f472b6", //pink400
          30: "#ec4899", //pink 500
          //BG COLORS
          90: "#f8e7fa", //bg clear
          95: "#312033", //bg dark
          DEFAULT: "#E78895",
        },
        success: {
          5: "#F5FBF4",
          10: "#DDF1DA",
          25: "#C6E8C1",
          45: "#B0E0A9",
          65: "#9AD791",
          85: "#83CE78",
          DEFAULT: "#6DC560",
        },
        warning: {
          5: "#FFF3EC",
          10: "#FFDECC",
          25: "#FFCDB1",
          45: "#FFBC97",
          65: "#FFAB7C",
          85: "#FF9A62",
          DEFAULT: "#FF8947",
        },
        danger: {
          5: "#FFF5F5",
          10: "#FBD0D0",
          25: "#F9B4B4",
          45: "#F69898",
          65: "#F47C7C",
          85: "#F16060",
          DEFAULT: "#EF4444",
        },
        // 'yellow': '#6863FB',
        yellow: {
          5: "#FFF9E7",
          10: "#FFEBAD",
          25: "#FFE287",
          45: "#FFD85B",
          65: "#FFD334",
          85: "#FFC800",
          DEFAULT: "#F2A626",
        },
        text: {
          5: "#E4E4E4",
          10: "#C7C7C7",
          15: "#ECECEC",
          25: "#878787",
          45: "#646464",
          65: "#4F4F4F",
          85: "#363636",
          DEFAULT: "#979797",
        },
      },
    },
  },
  plugins: [],
};
export default config;
