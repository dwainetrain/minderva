"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const firebase_1 = require("../firebase");
const mstile_150x150_png_1 = require("./assets/mstile-150x150.png");
const react_2 = require("@chakra-ui/react");
/* Login screen if user isn't logged-in, only handle google sign-in at the moment */
const LoginForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (react_1.default.createElement(react_2.Flex, { height: "75vh", width: "full", align: "center", justifyContent: "center" },
        react_1.default.createElement(react_2.Box, { p: 8, maxWidth: "500px", borderWidth: 1, borderRadius: 8 },
            react_1.default.createElement(react_2.Box, { display: "flex", alignItems: "center", justifyContent: "center" },
                react_1.default.createElement(react_2.Image, { boxSize: "50px", objectFit: "cover", src: mstile_150x150_png_1.default, mb: 3 })),
            react_1.default.createElement(react_2.Box, null,
                react_1.default.createElement(react_2.Heading, { as: "h1", fontSize: "3xl", fontFamily: "span", color: "tomato", textAlign: "center" }, "Minderva")),
            react_1.default.createElement(react_2.Box, { textAlign: "center" },
                react_1.default.createElement(react_2.Heading, { as: "h6", size: "sm", color: "grayGreen.800" }, "A Language Learning Tool")),
            react_1.default.createElement(react_2.Box, { my: 4, textAlign: "left" },
                react_1.default.createElement("form", { onSubmit: handleSubmit },
                    react_1.default.createElement(react_2.Button, { type: "submit", colorScheme: "teal", size: "md", variant: "outline", width: "full", mt: 4, onClick: firebase_1.signInWithGoogle }, "Sign in with Google"))))));
};
exports.default = LoginForm;
//# sourceMappingURL=LogIn.js.map