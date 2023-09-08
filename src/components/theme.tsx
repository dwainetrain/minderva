import { theme } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'

const customBreakpoints = ["360px", "900px", "1024px", "1366px"];

const breakpoints = {
  sm: customBreakpoints[0],
  md: customBreakpoints[1],
  lg: customBreakpoints[2],
  xl: customBreakpoints[3],
}

// TODO: Typescript conversion: Mabye use this structure instead?
// const breakpoints = {
//   sm: '360px',
//   md: '900px',
//   lg: '1024px',
//   xl: '1366px',
// }

// Theme Options
const customTheme = extendTheme({
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

  styles: {
    global: {
      'html': {
        height: '100%',
      },
      'body': {
        position: 'relative',
        minHeight: '100%',
        paddingBottom: "3rem",
        marginBottom: "5rem",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        backgroundColor: "#f4fff3",
        color: "#1a222f",
        lineHeight: "1.4rem",
        // height: "100%", // Uncomment this if you wish to use it
        textRendering: "optimizeLegibility",
        fontSmoothing: "antialiased",
        fontKerning: "normal"
      },
      'html, body': {
        bg: '#f4fff3',
      },
      'footer': {
        position: 'absolute',
        bottom: '0',
        width: '100%',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        marginBottom: '0',
        color: '#777777'
      },
      '.active': {
        borderBottom: '1px solid #f4fff4',
        transition: 'border-bottom 0.5s ease-in-out',
      },
      'hr': {
        borderWidth: "0px 0px 0px 0.0625rem",
        borderTopStyle: "initial",
        borderRightStyle: "initial",
        borderBottomStyle: "initial",
        borderImage: "initial",
        opacity: 0.6,
        borderLeftStyle: "solid",
        height: "auto",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        borderColor: "inherit"
      },
    },
  },
});

export default customTheme;