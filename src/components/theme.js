import { theme } from '@chakra-ui/core'

// Theme Options
// Let's say you want to add custom colors
const customTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
      },
      grayGreen: {
        200: "#dae3da",
        800: "#696d69"
      }
    },
    breakpoints: ["30em", "48em", "62em", "80em"],
    fonts: {
      heading: '"Playfair Display", "EB Garamond", sans-serif',
      body: '"Source Sans Pro", system-ui, sans-serif',
      mono: "Menlo, monospace",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1.25rem",
      lg: "1.70rem",
      xl: "2rem",
      "2xl": "2.25rem",
      "3xl": "2.5rem",
      "4xl": "3rem",
      "5xl": "4rem",
      "6xl": "5rem",
    },
    lineHeights: {
        normal: "normal",
        none: "1",
        shorter: "1.25",
        short: "1.375",
        base: "1.5",
        tall: "1.625",
        taller: "2",
      },
      fontWeights: {
        semibold: 500,
        extrabold: 900,
      },
  };
  
  export default customTheme;