"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const DeleteCard_1 = require("./DeleteCard");
const react_router_dom_1 = require("react-router-dom");
const moment_1 = require("moment");
const PlayAudio_1 = require("./PlayAudio");
const NoCards_1 = require("./NoCards");
const react_helmet_async_1 = require("react-helmet-async");
// Chakra UI
const react_2 = require("@chakra-ui/react");
const DisplayCards = ({ cardCollection, user, handleMessage, cardsLoaded }) => {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [searchResults, setSearchResults] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        // Just a very basic search
        const searchFilter = () => {
            const frontResults = cardCollection.filter(card => card.front
                .toLowerCase()
                .includes(searchTerm.toLowerCase()));
            const backResults = cardCollection.filter(card => card.back
                .toLowerCase()
                .includes(searchTerm.toLowerCase()));
            const totalResults = [...frontResults, ...backResults];
            console.log(`TOTAL RESULTS: ${JSON.stringify(totalResults[0])}`);
            setSearchResults([...new Set(totalResults)]);
        };
        if (cardCollection[0] !== 'loading') {
            searchFilter();
        }
    }, [cardCollection, searchTerm]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_2.Box, { px: { sm: 10, md: 24 }, py: 4, width: "100%" },
            react_1.default.createElement(react_helmet_async_1.Helmet, null,
                react_1.default.createElement("title", null, "Minderva | Card Collection")),
            react_1.default.createElement(react_2.Flex, { justifyContent: "space-between", alignItems: "flex-end" },
                react_1.default.createElement(react_2.InputGroup, null,
                    react_1.default.createElement(react_2.InputLeftElement, { children: react_1.default.createElement(react_2.Icon, { name: "search", color: "gray.300" }) }),
                    react_1.default.createElement(react_2.Input, { type: "search", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Search" })),
                react_1.default.createElement(react_2.Text, null,
                    "Showing ",
                    searchResults.length,
                    " of ",
                    cardCollection.length,
                    " total cards"))),
        cardsLoaded ?
            react_1.default.createElement(react_2.SimpleGrid, { columns: [2, null, 3], spacing: "32px", px: { sm: 10, md: 24 }, pb: "5rem", minChildWidth: "20rem" },
                cardCollection.length === 0 ? react_1.default.createElement(NoCards_1.default, null) : null,
                cardCollection[0] === 'loading' ? null : searchResults
                    .sort((a, b) => b.dateCreated.seconds.valueOf() - a.dateCreated.seconds.valueOf())
                    .map(card => react_1.default.createElement(react_2.Flex, { flexDirection: "column", justifyContent: "space-between", key: card.id, borderWidth: "1px", rounded: "lg", px: "3rem", py: "2rem", maxWidth: "36rem", minHeight: "16rem" },
                    react_1.default.createElement(react_2.Flex, null,
                        react_1.default.createElement(PlayAudio_1.default, { side: "front-audio" + card.id, source: card.frontAudioURL, type: '' }),
                        react_1.default.createElement(react_2.Text, { fontSize: "md" }, card.front)),
                    react_1.default.createElement(react_2.Divider, null),
                    react_1.default.createElement(react_2.Flex, null,
                        react_1.default.createElement(PlayAudio_1.default, { side: "back-audio" + card.id, source: card.backAudioURL, type: '' }),
                        react_1.default.createElement(react_2.Text, { fontSize: "md" }, card.back)),
                    react_1.default.createElement(react_2.Divider, null),
                    react_1.default.createElement(react_2.Text, null,
                        card.originLanguageName,
                        "/",
                        card.targetLanguageName),
                    react_1.default.createElement(react_2.Flex, { justifyContent: "space-between", py: 3 },
                        react_1.default.createElement(react_router_dom_1.Link, Object.assign({ to: `/edit-card/${card.id}` }, user),
                            react_1.default.createElement(react_2.Button, { as: "a", size: "sm", variant: "outline", id: card.id }, "Edit")),
                        react_1.default.createElement(DeleteCard_1.default, { user: user, id: card.id, handleMessage: handleMessage })),
                    react_1.default.createElement(react_2.Text, { fontSize: "xs", color: "grayGreen.800" },
                        "Created: ",
                        moment_1.default.unix(card.dateCreated.seconds).calendar())))) :
            react_1.default.createElement(react_2.Flex, { justifyContent: "Center", alignItems: "Center", mx: { sm: 10, md: 24 } },
                react_1.default.createElement(react_2.Box, null,
                    react_1.default.createElement(react_2.Spinner, { color: "tomato" })))));
};
exports.default = DisplayCards;
//# sourceMappingURL=DisplayCards.js.map