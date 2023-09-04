"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("@chakra-ui/react");
/* If cards are in the database, shows number of cards up for review */
const ReviewCount = ({ cardCollection }) => {
    return (react_1.default.createElement(react_2.Flex, { mx: { sm: 0, md: 12, lg: 16 }, flexDirection: "column", justifyContent: "space-around", alignItems: "center", minH: "16rem", minW: { sm: 48, md: 'sm' }, maxW: "md" },
        react_1.default.createElement(react_2.Box, { textAlign: "center" },
            react_1.default.createElement(react_2.Box, { fontWeight: "semibold" }, "You Have"),
            react_1.default.createElement(react_2.Flex, { justifyContent: "center" },
                react_1.default.createElement(react_2.Heading, { fontSize: "8rem", fontFamily: "span", fontWeight: "100", lineHeight: "8rem" }, cardCollection.length)),
            react_1.default.createElement(react_2.Box, { fontWeight: "semibold", as: "h4" }, "Cards Ready for Review"),
            react_1.default.createElement(react_2.Button, { as: react_router_dom_1.NavLink, mt: 6, px: 2, to: "/quiz", size: "md", colorScheme: "teal", variant: "outline" }, "Review Now"))));
};
exports.default = ReviewCount;
//# sourceMappingURL=ReviewCount.js.map