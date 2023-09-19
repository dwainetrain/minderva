"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const speechLanguagesMap_1 = require("./speechLanguagesMap");
const react_2 = require("@chakra-ui/react");
/* Language selection using imported handmade language map */
const SelectLanguage = ({ handleLanguageSelect, selected, keyTo }) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_2.Select, { marginBottom: 3, size: "lg", variant: "outline", onChange: handleLanguageSelect, value: selected }, Object.keys(speechLanguagesMap_1.speechLanguageMap).map(lang => react_1.default.createElement("option", { value: lang, key: lang + keyTo }, speechLanguagesMap_1.speechLanguageMap[lang].language)))));
};
exports.default = SelectLanguage;
//# sourceMappingURL=SelectLanguage.js.map