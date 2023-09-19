"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Dashboard_1 = require("./Dashboard");
const UserProfile_1 = require("./UserProfile");
const AddCard_1 = require("./AddCard");
const Quiz_1 = require("./Quiz");
const Review_1 = require("./Review");
const DisplayCards_1 = require("./DisplayCards");
const NotFound_1 = require("./NotFound");
const About_1 = require("./About");
const Header_1 = require("./Header");
/* Primary routing of app */
const UserRoute = ({ user, cardCollection, handleMessage, userLangPrefs, loading, cardsLoaded }) => {
    console.log(`USER IN ROUTE: ${JSON.stringify(user)}`);
    const location = (0, react_router_dom_1.useLocation)();
    const CardActionsWrapper = ({ mode }) => {
        const { id } = (0, react_router_dom_1.useParams)();
        return react_1.default.createElement(AddCard_1.default, { cardId: id, handleMessage: handleMessage, user: user, userLangPrefs: userLangPrefs, mode: mode });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("header", { className: "App-header" }, location.pathname === "/quiz" ? null : react_1.default.createElement(Header_1.default, null)),
        react_1.default.createElement("div", null,
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Dashboard_1.default, Object.assign({ user: user, cardCollection: cardCollection }, loading, { cardsLoaded: cardsLoaded })) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/review", element: react_1.default.createElement(Review_1.default, { cardCollection: cardCollection, cardsLoaded: cardsLoaded }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/quiz", element: react_1.default.createElement(Quiz_1.default, { cardCollection: cardCollection }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/card-collection", element: react_1.default.createElement(DisplayCards_1.default, { cardCollection: cardCollection, user: user, handleMessage: handleMessage, cardsLoaded: cardsLoaded }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/edit-card/:id", element: react_1.default.createElement(CardActionsWrapper, { mode: "update" }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/add-cards", element: react_1.default.createElement(CardActionsWrapper, { mode: "add" }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/user-profile", element: react_1.default.createElement(UserProfile_1.default, { user: user, userLangPrefs: userLangPrefs, handleMessage: handleMessage }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/about", element: react_1.default.createElement(About_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { element: react_1.default.createElement(NotFound_1.default, null) })))));
};
exports.default = UserRoute;
//# sourceMappingURL=UserRoute.js.map