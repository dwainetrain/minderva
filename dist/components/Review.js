"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Quote_1 = require("./Quote");
const react_2 = require("@chakra-ui/react");
const NoCards_1 = require("./NoCards");
const react_helmet_async_1 = require("react-helmet-async");
const ReviewCount_1 = require("./ReviewCount");
/* Review page, shows quote and cards up for review. More to be added in the future. */
const Review = ({ cardCollection, cardsLoaded }) => {
    return (react_1.default.createElement(react_2.Flex, { ml: { sm: 8, md: 20 }, flexDirection: { sm: "column", md: "row" }, flex: "wrap", alignItems: { sm: "center", md: "initial" }, mt: { sm: 0, md: 4 } },
        react_1.default.createElement(react_helmet_async_1.Helmet, null,
            react_1.default.createElement("title", null, "Minderva | Review")),
        react_1.default.createElement(react_2.Box, null, !cardsLoaded ?
            react_1.default.createElement(react_2.Flex, { justifyContent: "center", alignItems: "center", mx: { sm: 10, md: 16 } },
                react_1.default.createElement(react_2.Box, null,
                    react_1.default.createElement(react_2.Spinner, { color: "tomato" })))
            : cardCollection.length === 0 ?
                react_1.default.createElement(react_2.Box, { ml: 8 },
                    react_1.default.createElement(NoCards_1.default, null))
                :
                    react_1.default.createElement(ReviewCount_1.default, { cardCollection: cardCollection })),
        react_1.default.createElement(react_2.Divider, { orientation: 'vertical', borderColor: { sm: "grayGreen.200" }, display: { sm: "none", md: 'initial' }, maxH: "sm" }),
        react_1.default.createElement(react_2.Divider, { borderColor: { sm: "grayGreen.200" }, minW: "sm", display: { sm: "initial", md: 'none' }, mb: 4 }),
        react_1.default.createElement(react_2.Box, { display: "flex", alignItems: "center", maxW: "sm", ml: { sm: 0, md: 6 } },
            react_1.default.createElement(Quote_1.default, null))));
};
exports.default = Review;
//# sourceMappingURL=Review.js.map