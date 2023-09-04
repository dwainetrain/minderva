"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
/* Shares basic information about the App */
const About = () => {
    console.log('Your on the About page!');
    return (react_1.default.createElement(react_2.Box, { mt: 4, px: 24 },
        react_1.default.createElement(react_2.Text, null, "Minderva was created by Dwaine Best as the final project for the Summer 2020 UCSD Extension Applied Javascript Course."),
        react_1.default.createElement(react_2.Text, null, "It was built using React, Chakra UI, the Firebase platform, Google Translate and Google Text-to-Speech"),
        react_1.default.createElement(react_2.Text, null,
            "It is in perpetual development. If you'd like, you can view the ",
            react_1.default.createElement(react_2.Link, { href: "https://github.com/dwainetrain/minderva", color: "teal.500" }, "version history"),
            ".")));
};
exports.default = About;
//# sourceMappingURL=About.js.map