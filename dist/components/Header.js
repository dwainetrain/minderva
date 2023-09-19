"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const firebase_1 = require("../firebase");
const react_2 = require("@chakra-ui/react");
const react_3 = require("@chakra-ui/react");
const fi_1 = require("react-icons/fi");
/* Primary site navigation bar */
const NavbarLink = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (react_1.default.createElement(react_2.Box, Object.assign({ _hover: {
            textDecoration: "none", borderBottom: "1px solid #f4fff4",
            transition: "border-bottom 0.5s ease-in-out", color: "white"
        }, _active: { color: "white" }, _focus: { color: "white", textDecoration: "none" }, as: "a", color: "white", fontWeight: "semibold", letterSpacing: "wide", px: 3 }, props), children));
};
const Header = () => {
    const [show, setShow] = (0, react_1.useState)(false);
    const handleToggle = () => setShow(!show);
    return (react_1.default.createElement(react_2.Flex, { bg: "tomato", w: "100%", as: "nav", px: { sm: 10, md: 24 }, py: 3, justifyContent: "space-between", alignItems: "baseline", wrap: "wrap", color: "white" },
        react_1.default.createElement(react_2.Box, { fontWeight: "extrabold" },
            react_1.default.createElement(react_2.Link, { as: react_router_dom_1.Link, to: '/', color: "white", _hover: { textDecoration: "none", color: "white" }, _active: { color: "white" }, _focus: { color: "white", textDecoration: "none" }, fontFamily: "span", letterSpacing: "0.1em", fontSize: "lg", lineHeight: "0" }, "Minderva")),
        react_1.default.createElement(react_2.Box, { display: { base: "block", md: "none" }, onClick: handleToggle },
            react_1.default.createElement("title", null, "Menu"),
            !show ? react_1.default.createElement(react_2.Box, { as: fi_1.FiMenu, size: 4 }) : react_1.default.createElement(react_2.Box, { as: fi_1.FiX, size: 4 })),
        react_1.default.createElement(react_2.Box, { display: { sm: show ? "flex" : "none", md: "flex" }, flexDirection: { sm: "column", md: "row" }, width: { sm: "full", md: "auto" }, ml: { sm: "-0.5rem", md: 36 }, mt: { base: 4, md: 0 }, flexGrow: 1 },
            react_1.default.createElement(react_2.Box, { my: { sm: 3, md: 0 } },
                react_1.default.createElement(NavbarLink, { as: react_router_dom_1.NavLink, px: 2, to: "/review", key: "review" }, "Review")),
            react_1.default.createElement(react_3.Divider, { orientation: "vertical" }),
            react_1.default.createElement(react_2.Box, { my: { sm: 3, md: 0 } },
                react_1.default.createElement(NavbarLink, { as: react_router_dom_1.NavLink, px: 2, to: "/add-cards", key: "add" }, "Add Cards")),
            react_1.default.createElement(react_3.Divider, { orientation: "vertical" }),
            react_1.default.createElement(react_2.Box, { my: { sm: 3, md: 0 } },
                react_1.default.createElement(NavbarLink, { as: react_router_dom_1.NavLink, px: 2, to: "/card-collection", key: "collection" }, "Card Collection"))),
        react_1.default.createElement(react_2.Box, { display: { sm: show ? "block" : "none", md: "flex" }, mt: { base: 4, md: 0 }, ml: { sm: "-0.5rem", md: 0 } },
            react_1.default.createElement(react_2.Box, { ml: "-0.25rem" },
                react_1.default.createElement(NavbarLink, { as: react_router_dom_1.NavLink, to: "/user-profile" }, "User Profile")),
            !show ? react_1.default.createElement(react_3.Divider, { orientation: 'vertical' }) : null,
            react_1.default.createElement(react_3.Divider, { my: 3, variant: (0, react_3.useBreakpointValue)({ sm: 'horizontal', md: 'vertical' }) }),
            react_1.default.createElement(react_2.Box, null,
                react_1.default.createElement(NavbarLink, { as: react_router_dom_1.Link, px: 2, color: "white", to: "", onClick: firebase_1.signOut }, "Sign Out")))));
};
exports.default = Header;
//# sourceMappingURL=Header.js.map