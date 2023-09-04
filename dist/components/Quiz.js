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
const PlayAudio_1 = require("./PlayAudio");
const react_router_dom_1 = require("react-router-dom");
const react_helmet_async_1 = require("react-helmet-async");
// Chakra UI
const react_2 = require("@chakra-ui/react");
/* Logic and layout for card Quiz, a little bloated at the moment */
const Quiz = ({ cardCollection }) => {
    const [quizCards, setQuizCards] = (0, react_1.useState)(''); // TODO: Is this the best way to type this?
    const [cardNumber, setCardNumber] = (0, react_1.useState)(0);
    const [cardSide, setCardSide] = (0, react_1.useState)('Card Front');
    const [firstFlip, setFirstFlip] = (0, react_1.useState)(true);
    const [quizReset, setQuizReset] = (0, react_1.useState)(true);
    // Using router history to handle exiting the quiz
    const history = (0, react_router_dom_1.useNavigate)();
    // Function to shuffle the cards
    const shuffleCards = (cards) => cards
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
    // On loading the quiz, create a quiz object that shuffles the cards by an order number
    (0, react_1.useEffect)(() => {
        const quizData = () => {
            const cards = cardCollection.map((card, index) => { return Object.assign({ 'order': index }, card); });
            return shuffleCards(cards);
        };
        setQuizCards(quizData());
    }, [cardCollection, quizReset]);
    const nextCard = () => {
        setCardNumber(cardNumber + 1);
        setCardSide('Card Front');
        setFirstFlip(true);
    };
    const flipCard = () => {
        cardSide === 'Card Front' ? setCardSide('Card Back') : setCardSide('Card Front');
        setFirstFlip(false);
    };
    // Card count display
    const CardCount = ({ cardNumber, totalCards }) => {
        if (cardNumber + 1 > totalCards) {
            return react_1.default.createElement(react_2.Text, null, "End of Deck");
        }
        else {
            return (react_1.default.createElement(react_2.Text, null,
                (cardNumber + 1).toString().padStart(2, '0'),
                "/",
                totalCards.toString().padStart(2, '0')));
        }
    };
    // Parent style for card
    const QuizCard = (_a) => {
        var { children } = _a, props = __rest(_a, ["children"]);
        return (react_1.default.createElement(react_2.Box, Object.assign({ px: 20, py: 20, height: "24rem", borderWidth: "1px", rounded: "lg" }, props, { width: { sm: "100%", md: "35rem" }, display: "flex", flexDirection: "column", justifyContent: "space-between" }), children));
    };
    // Parent style for card text
    const CardText = (_a) => {
        var { children } = _a, props = __rest(_a, ["children"]);
        return (react_1.default.createElement(react_2.Text, Object.assign({ fontFamily: "span", fontSize: "4xl", lineHeight: "shorter" }, props), children));
    };
    const DisplayCard = () => {
        if (cardSide === 'Card Front') {
            return (react_1.default.createElement(QuizCard, null,
                react_1.default.createElement(CardText, null, quizCards[cardNumber].front),
                react_1.default.createElement(react_2.Text, { color: "#999999" },
                    "translate to ",
                    quizCards[cardNumber].targetLanguageName),
                quizCards[cardNumber].frontAudioURL ?
                    react_1.default.createElement(PlayAudio_1.default, { side: 'front-audio', source: quizCards[cardNumber].frontAudioURL })
                    :
                        null,
                react_1.default.createElement(react_2.Button, { size: "sm", onClick: flipCard }, "Flip Card")));
        }
        else {
            return (react_1.default.createElement(QuizCard, null,
                react_1.default.createElement(CardText, null, quizCards[cardNumber].back),
                quizCards[cardNumber].backAudioURL ?
                    react_1.default.createElement(PlayAudio_1.default, { side: 'back-audio', source: quizCards[cardNumber].backAudioURL })
                    :
                        null,
                react_1.default.createElement(react_2.Button, { size: "sm", onClick: flipCard }, "Flip Card")));
        }
    };
    const CardControl = () => {
        return (react_1.default.createElement(react_2.Flex, { justifyContent: "space-between", height: "5rem", alignItems: "center" },
            react_1.default.createElement(react_2.Box, { display: "flex", width: "56%", pl: "2rem" },
                react_1.default.createElement(react_2.Button, { size: "sm", variant: "link", onClick: () => history(-1) }, "Exit Review")),
            react_1.default.createElement(react_2.Flex, { justifyContent: "flex-end", pr: "2rem" }, firstFlip ?
                react_1.default.createElement("span", null)
                : (cardNumber + 1 === quizCards.length) ?
                    react_1.default.createElement(react_2.Button, { size: "sm", onClick: nextCard }, "Complete") :
                    react_1.default.createElement(react_2.Button, { size: "sm", onClick: nextCard }, "Next Card"))));
    };
    // It does work, but this needs a serious amount of refactoring, 
    const QuizState = () => {
        if (quizCards[cardNumber] !== undefined) {
            return (react_1.default.createElement(react_2.Flex, { px: { sm: 10, md: 16 }, py: "3rem", justifyContent: "flex-start", flexDirection: { sm: 'column-reverse', md: 'row' } },
                react_1.default.createElement(react_2.Box, { pr: "2rem", width: "8rem", textAlign: { sm: "left", md: "right" } },
                    react_1.default.createElement(CardCount, { cardNumber: cardNumber, totalCards: quizCards.length }),
                    react_1.default.createElement(react_2.Text, null, cardSide)),
                react_1.default.createElement(react_2.Box, null,
                    react_1.default.createElement(DisplayCard, null),
                    react_1.default.createElement(CardControl, null))));
        }
        else {
            if (quizCards.length !== 0 && cardNumber + 1 > quizCards.length) {
                return (react_1.default.createElement(react_2.Flex, { px: { sm: 10, md: 16 }, py: "3rem", justifyContent: "flex-start", flexDirection: { sm: 'column-reverse', md: 'row' } },
                    react_1.default.createElement(react_2.Box, { pr: "2rem", width: "8rem", textAlign: { sm: "left", md: "right" } },
                        react_1.default.createElement(CardCount, { cardNumber: cardNumber, totalCards: quizCards.length })),
                    react_1.default.createElement(react_2.Box, null,
                        react_1.default.createElement(QuizCard, null,
                            react_1.default.createElement(react_2.Text, { textAlign: "center", fontSize: "2xl" },
                                "Review Complete ",
                                react_1.default.createElement("span", { role: "img", "aria-label": "Celebration Emoji" }, "\uD83C\uDF89")),
                            react_1.default.createElement(react_2.Button, { size: "sm", onClick: () => {
                                    quizReset ? setQuizReset(false) : setQuizReset(true);
                                    setCardNumber(0);
                                } }, "Review Again"),
                            react_1.default.createElement(react_2.Button, { variant: "link", onClick: () => history(-1) }, "Exit Review")))));
            }
            else {
                return (react_1.default.createElement(react_2.Flex, { px: { sm: 10, md: 16 }, py: "3rem", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: { sm: 'column-reverse', md: 'column' } },
                    react_1.default.createElement(QuizCard, null,
                        react_1.default.createElement(react_2.Flex, { justifyContent: "Center", alignItems: "Center", mx: { sm: 10, md: 40 } },
                            react_1.default.createElement(react_2.Box, null,
                                react_1.default.createElement(react_2.Spinner, { color: "tomato" }))),
                        react_1.default.createElement(react_2.Text, null, "Loading Review")),
                    react_1.default.createElement(react_2.Button, { mt: 4, variant: "link", onClick: () => history(-1) }, "Exit Review")));
            }
        }
    };
    return (react_1.default.createElement(react_2.Flex, { flexWrap: "wrap", flexDirection: { sm: 'column-reverse', md: 'row' } },
        react_1.default.createElement(react_helmet_async_1.Helmet, null,
            react_1.default.createElement("title", null, "Minderva | Quiz")),
        react_1.default.createElement(react_2.Box, null,
            react_1.default.createElement(react_2.Heading, { as: "h1", fontSize: "2xl", fontFamily: "span", pl: { sm: 10, md: 16 }, py: "3rem", color: "tomato" }, "Minderva")),
        react_1.default.createElement(QuizState, null)));
};
exports.default = Quiz;
//# sourceMappingURL=Quiz.js.map