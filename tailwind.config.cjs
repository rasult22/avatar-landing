const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '250%': '200%',
      '16': '4rem',
    },
    backgroundPosition: {
      'p-100%': '100%',
      'p-50%': '50%',
      bottom: 'bottom',
      'bottom-4': 'center bottom 1rem',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
      'top-4': 'center top 1rem',
    },
    extend: {
      fontFamily: {
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'app-bg': '#091720',
        'app-bg-2': '#0B3D5D',
        'app-grey-text': '#DBE2EA',
        'app-border': 'linear-gradient(90deg, #0B63F6 0%, #9F87FF 43%, #08D5EC 73%, #41F892 100%);',
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      boxShadow: {
        'layout': '0 -1px 3px 0 rgba(7, 10, 14, 0.8);',
        'card': '0 0 36px 0 #1da1f2;'
      },
      fontFamily: {
        Inter: ["Inter Variable"],
        Poppins: ["Poppins"],
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
