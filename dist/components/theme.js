"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const customBreakpoints = ["360px", "900px", "1024px", "1366px"];
const breakpoints = {
    sm: customBreakpoints[0],
    md: customBreakpoints[1],
    lg: customBreakpoints[2],
    xl: customBreakpoints[3],
};
// TODO: Typescript conversion: Mabye use this structure instead?
// const breakpoints = {
//   sm: '360px',
//   md: '900px',
//   lg: '1024px',
//   xl: '1366px',
// }
// Theme Options
const customTheme = Object.assign(Object.assign({}, react_1.theme), { breakpoints, colors: Object.assign(Object.assign({}, react_1.theme.colors), { brand: {
            900: "#1a365d",
            800: "#153e75",
            700: "#2a69ac",
        }, grayGreen: {
            200: "#dae3da",
            800: "#696d69"
        } }), fonts: {
        heading: '"span", sans-serif',
        body: '"Source Sans Pro", system-ui, sans-serif',
        mono: "Menlo, monospace",
    }, fontSizes: {
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
    }, lineHeights: {
        normal: "normal",
        none: "1",
        shorter: "1.25",
        short: "1.375",
        base: "1.5",
        tall: "1.625",
        taller: "2",
    }, fontWeights: {
        semibold: 500,
        extrabold: 900,
    } });
exports.default = customTheme;
//# sourceMappingURL=theme.js.map