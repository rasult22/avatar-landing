const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'app-bg': '#091720',
        'app-bg-2': '#0B3D5D',
        'app-grey-text': '#DBE2EA',
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      boxShadow: {
        'layout': '0 -1px 3px 0 rgba(7, 10, 14, 0.8);'
      },
      textColor: {
        default: "var(--color-text)",
        offset: "var(--color-text-offset)",
      },
      backgroundColor: {
        default: "var(--color-background)",
        offset: "var(--color-background-offset)",
      },
      borderColor: {
        default: "var(--color-border)",
      },
      screens: {
        "custom-screen": { raw: "(max-height: 670px)" },
        lg: { min: "1200px" },
        md: { max: "1200px", min: "700px" },
        sm: { max: "700px", min: "0px" },
      },
    },
  },
  plugins: [require("tailwindcss-fluid-type")],
};
