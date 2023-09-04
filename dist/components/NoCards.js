"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const react_router_dom_1 = require("react-router-dom");
/* Component displayed if there's no cards in the database */
const NoCards = () => {
    return (react_1.default.createElement(react_2.Flex, { flexDirection: "column", justifyContent: "center", alignItems: "flex-start", minH: "sm", minW: "sm", maxW: "md" },
        react_1.default.createElement(react_2.Text, null, "Add some cards to get started with Minderva."),
        react_1.default.createElement(react_2.Button, { size: "lg", colorScheme: "teal", variant: "outline", style: { textDecoration: 'none' }, as: react_router_dom_1.NavLink, to: "/add-cards", mt: 10 }, "Add Cards")));
};
exports.default = NoCards;
//# sourceMappingURL=NoCards.js.map