module.exports = {
  purge: {
    content: [ 
      './src/**/*.html',
      './src/**/*.{js,jsx,ts,tsx}' 
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      // assets/styles/_type
      sans: "var(--calcite-sans-family)",
      mono: "var(--calcite-code-family)",
      inherit: "inherit"
    },
    fontWeight: {
      // assets/styles/_type
      light: "var(--calcite-font-weight-light)",
      normal: "var(--calcite-font-weight-normal)",
      medium: "var(--calcite-font-weight-medium)",
      bold: "var(--calcite-font-weight-bold)"
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
