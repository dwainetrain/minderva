import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import './index.css'

// Chakra Styling
import { theme, ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";

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
  },
  breakpoints: ["30em", "48em", "62em", "80em"],
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.70rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  }
};

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={customTheme}>
      <ColorModeProvider >
        <CSSReset />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ColorModeProvider>
      </ThemeProvider>
  </React.StrictMode>,
document.getElementById('root') 
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
