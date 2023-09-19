"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./Quote.css");
const quotes_1 = require("./quotes");
/* Logic and display of Quote.
    Extracts a single word from a quote and replaces it with another word
    then toggles between the words on hover
*/
const Quote = () => {
    const [originalWord, setOriginalWord] = (0, react_1.useState)('');
    const [revealWord, setRevealWord] = (0, react_1.useState)('');
    const [newQuote, setNewQuote] = (0, react_1.useState)('');
    const [author, setAuthor] = (0, react_1.useState)('');
    const [firstHalf, setFirstHalf] = (0, react_1.useState)('');
    const [lastHalf, setLastHalf] = (0, react_1.useState)('');
    const [wordTransistion, setWordTransition] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        // Pulls random quote, and replaces selected word with translated word
        // Just works on a single word for now
        const randomQuote = quotes_1.quotes[Math.floor(Math.random() * quotes_1.quotes.length)];
        setNewQuote(randomQuote.quote);
        setOriginalWord(randomQuote.originalWord);
        setWordTransition(randomQuote.revealWord);
        setRevealWord(randomQuote.revealWord);
        setAuthor(randomQuote.author);
        const splitQuote = newQuote.split(' ');
        const wordLocation = splitQuote.findIndex(word => word === randomQuote.originalWord);
        setFirstHalf(splitQuote.slice(0, wordLocation).join(' '));
        setLastHalf(splitQuote.slice(wordLocation + 1).join(' '));
    }, [newQuote]);
    return (react_1.default.createElement("div", { className: "quote--container" },
        react_1.default.createElement("span", { className: "quote" },
            firstHalf,
            react_1.default.createElement("span", { className: "quote--highlight", onMouseEnter: () => setWordTransition(originalWord), onMouseLeave: () => setWordTransition(revealWord) },
                "\u00A0",
                wordTransistion,
                "\u00A0"),
            lastHalf),
        react_1.default.createElement("span", { className: "quote--author" },
            "\u2013 ",
            author)));
};
exports.default = Quote;
//# sourceMappingURL=Quote.js.map