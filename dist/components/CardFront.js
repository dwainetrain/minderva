"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PlayAudio_1 = require("./PlayAudio");
const SelectLanguage_1 = require("./SelectLanguage");
// UI
const react_2 = require("@chakra-ui/react");
/*
Card Front used in Add/Edit Card screens
*/
const CardFront = ({ toLanguage, handleFromLanguageSelect, fromLanguage, front, handleFront, loadingAudio, frontAudio }) => {
    return (react_1.default.createElement(react_2.Stack, { flexBasis: "100%", flex: "1", padding: 4, spacing: 3, minWidth: "sm", maxW: "md", borderWidth: "1px", rounded: "lg", overflow: "hidden", minH: { sm: "initial", md: "18rem" } },
        react_1.default.createElement(react_2.Box, null,
            react_1.default.createElement(react_2.Text, { textAlign: "center", color: "blackAlpha.500" }, "ORIGIN LANGUAGE")),
        !toLanguage ? react_1.default.createElement(react_2.Text, null, "Loading language") : react_1.default.createElement(SelectLanguage_1.default, { handleLanguageSelect: handleFromLanguageSelect, selected: fromLanguage, keyTo: "text" }),
        react_1.default.createElement(react_2.Input, { name: "front", placeholder: "Card Front", value: front, onChange: handleFront, maxLength: 60, autoComplete: "off", size: "lg", isRequired: true }),
        loadingAudio === '' ?
            null
            : loadingAudio === 'loading' && frontAudio === '' ?
                react_1.default.createElement(react_2.Box, null,
                    react_1.default.createElement(react_2.Spinner, null),
                    react_1.default.createElement("p", null, "Generating Audio"))
                :
                    react_1.default.createElement(react_2.Box, { ml: 3 },
                        react_1.default.createElement(PlayAudio_1.default, { type: "button", side: 'front-audio', source: frontAudio }))));
};
exports.default = CardFront;
//# sourceMappingURL=CardFront.js.map