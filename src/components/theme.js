import { theme } from '@chakra-ui/core'

/* Chakra Theme file */

const breakpoints = ["360px", "900px", "1024px", "1366px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

// Theme Options
const customTheme = {
    ...theme,
    breakpoints,
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
    fonts: {
      heading: '"span", sans-serif',
      body: '"Source Sans Pro", system-ui, sans-serif',
      mono: "Menlo, monospace",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.50rem",
      "2xl": "1.75rem",
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