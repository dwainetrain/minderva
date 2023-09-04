"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const LogIn_1 = require("./LogIn");
const react_router_dom_1 = require("react-router-dom");
const react_helmet_async_1 = require("react-helmet-async");
const ReviewCount_1 = require("./ReviewCount");
const Quote_1 = require("./Quote");
const react_2 = require("@chakra-ui/react");
const NoCards_1 = require("./NoCards");
/* Basic Dashboard Page, is the root route */
const UserDashboard = ({ cardCollection, cardsLoaded }) => {
    return (react_1.default.createElement(react_2.Flex, { ml: { sm: 0, md: 24 } },
        react_1.default.createElement(react_helmet_async_1.Helmet, null,
            react_1.default.createElement("title", null, "Minderva | Dashboard")),
        react_1.default.createElement(react_2.Box, { width: "100%", mt: 4 },
            react_1.default.createElement(react_2.Box, { ml: { sm: 10, md: 0 } },
                react_1.default.createElement(Quote_1.default, null)),
            react_1.default.createElement(react_2.Flex, { flexDirection: { sm: "column", md: "row" }, flex: "wrap", alignItems: { sm: "center", md: "initial" } },
                !cardsLoaded ?
                    react_1.default.createElement(react_2.Flex, { justifyContent: "center", alignItems: "center", mx: { sm: 10, md: 16 } },
                        react_1.default.createElement(react_2.Box, null,
                            react_1.default.createElement(react_2.Spinner, { color: "tomato" })))
                    : cardCollection.length === 0 ?
                        react_1.default.createElement(NoCards_1.default, null)
                        :
                            react_1.default.createElement(ReviewCount_1.default, { cardCollection: cardCollection }),
                react_1.default.createElement(react_2.Divider, { orientation: 'vertical', borderColor: { sm: "grayGreen.200" }, display: { sm: "none", md: 'initial' } }),
                react_1.default.createElement(react_2.Flex, { flexDirection: "column", justifyContent: "space-around", alignItems: "flex-start", minW: "sm", maxW: "sm", py: 6, mx: { sm: 10, md: 12, lg: 16 }, px: { sm: 6 }, borderWidth: { sm: "1px", md: 0 } },
                    react_1.default.createElement(react_2.Text, { fontSize: "lg", fontWeight: "semibold", color: "grayGreen.800", mb: 8 }, "Explore your Minderva"),
                    react_1.default.createElement(react_2.Box, { mb: 6 },
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/add-cards" },
                            react_1.default.createElement(react_2.Button, { as: "a", size: "sm", mb: 3, variant: "outline" }, "Add Cards")),
                        react_1.default.createElement(react_2.Text, null, "Tranaslate words or phrases and add them to your collection.")),
                    react_1.default.createElement(react_2.Box, { mb: 6 },
                        react_1.default.createElement(react_2.Box, null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/card-collection" },
                                react_1.default.createElement(react_2.Button, { as: "a", size: "sm", mb: 3, variant: "outline", flexShrink: 1 }, "Card Collection"))),
                        react_1.default.createElement(react_2.Box, null,
                            react_1.default.createElement(react_2.Text, null, "View, edit or delete your saved cards."))),
                    react_1.default.createElement(react_2.Box, null,
                        react_1.default.createElement(react_2.Box, null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/user-profile" },
                                react_1.default.createElement(react_2.Button, { as: "a", mb: 3, size: "sm", variant: "outline" }, "User Profile"))),
                        react_1.default.createElement(react_2.Box, null,
                            react_1.default.createElement(react_2.Text, null, "View your profile and edit default language preferences."))))),
            react_1.default.createElement(react_2.Stack, { mt: 5, mb: 10, ml: { sm: 10, md: 0 }, spacing: 4 },
                react_1.default.createElement(react_2.Divider, { mb: 4, mr: 32 }),
                react_1.default.createElement(react_2.Text, null, "Minderva is a cobblestone in the cobbled pathway of language study."),
                react_1.default.createElement(react_2.Text, null, "It is a tool that uses flash cards, translation, text-to-speech and motivational cues to keep you learning."),
                react_1.default.createElement(react_2.Text, null, "I hope it helps you get to where you\u2019re going.")))));
};
const Dashboard = ({ user, cardCollection, cardsLoaded }) => {
    return (react_1.default.createElement("div", null, user ?
        react_1.default.createElement(UserDashboard, { cardCollection: cardCollection, cardsLoaded: cardsLoaded })
        :
            react_1.default.createElement(LogIn_1.default, null)));
};
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map