"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
const App_1 = require("./components/App");
const serviceWorker = require("./serviceWorker");
const react_router_dom_1 = require("react-router-dom");
const react_helmet_async_1 = require("react-helmet-async");
// Chakra Styling
const react_2 = require("@chakra-ui/react");
const theme_1 = require("./components/theme");
const domNode = document.getElementById('root');
const root = (0, client_1.createRoot)(domNode);
root.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(react_helmet_async_1.HelmetProvider, null,
        react_1.default.createElement(react_2.ChakraProvider, { theme: theme_1.default },
            react_1.default.createElement(react_2.CSSReset, null),
            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(App_1.default, null))))));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//# sourceMappingURL=index.js.map