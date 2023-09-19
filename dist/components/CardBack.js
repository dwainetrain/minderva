"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PlayAudio_1 = require("./PlayAudio");
const SelectLanguage_1 = require("./SelectLanguage");
// UI
const react_2 = require("@chakra-ui/react");
const ai_1 = require("react-icons/ai");
/*
Card Back used in Add/Edit Card screens
*/
const CardBack = ({ toLanguage, handleToLanguageSelect, back, handleManualGenerateAudio, loadingTranslation, handleBack, front, loadingAudio, backAudio, handleTranslate, handleGenerateChecked, manual, fromLanguage }) => {
    const [manualEntry, setManualEntry] = (0, react_1.useState)(manual);
    return (react_1.default.createElement(react_2.Stack, { flexBasis: "100%", flex: "1", padding: 4, spacing: 3, maxW: "sm", borderWidth: "1px", rounded: "lg", minWidth: "sm", maxWidth: "md", minH: "18rem" },
        react_1.default.createElement(react_2.Box, { width: "100%" },
            react_1.default.createElement(react_2.Text, { textAlign: "center", color: "blackAlpha.500" }, "TARGET LANGUAGE")),
        !toLanguage ? react_1.default.createElement(react_2.Text, null, "Loading language") :
            react_1.default.createElement(SelectLanguage_1.default, { handleLanguageSelect: handleToLanguageSelect, selected: toLanguage, keyTo: "target" }),
        manualEntry === true ?
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_2.Input, { name: "back", placeholder: "Back", value: back, onChange: handleBack, maxLength: 60, autoComplete: "off", size: "lg" }))
            :
                react_1.default.createElement(react_2.Heading, { as: "h3", mt: 3 }, back),
        loadingAudio === '' ?
            null
            : loadingAudio === 'loading' && backAudio === '' ?
                react_1.default.createElement(react_2.Box, null,
                    react_1.default.createElement(react_2.Spinner, null),
                    react_1.default.createElement("p", null, "Generating Audio"))
                :
                    react_1.default.createElement(react_2.Box, { ml: 3, mt: 1 },
                        react_1.default.createElement(PlayAudio_1.default, { type: "button", side: 'back-audio', source: backAudio })),
        react_1.default.createElement(react_2.Divider, { my: 6 }),
        manualEntry === true ?
            react_1.default.createElement(react_2.Box, { display: "flex", justifyContent: "space-between" },
                react_1.default.createElement(react_2.Button, { as: "a", variant: "link", onClick: () => setManualEntry(false), leftIcon: react_1.default.createElement(ai_1.AiOutlineLeft, null) }, "Translation"),
                react_1.default.createElement(react_2.Button, { colorScheme: "cyan", leftIcon: react_1.default.createElement(ai_1.AiOutlineRight, null), onClick: handleManualGenerateAudio }, "Generate Audio"))
            :
                react_1.default.createElement(react_2.Stack, null,
                    react_1.default.createElement(react_2.Button, { colorScheme: "twitter", variant: "outline", isLoading: front !== '' && loadingTranslation, leftIcon: react_1.default.createElement(ai_1.AiOutlineRight, null), onClick: (e) => {
                            setManualEntry(false);
                            handleTranslate(e);
                        } }, "Translate"),
                    react_1.default.createElement(react_2.Checkbox, { mr: 3, colorScheme: "teal", defaultChecked: true, onChange: handleGenerateChecked }, "Generate Audio"),
                    react_1.default.createElement(react_2.Button, { size: "sm", variant: "link", leftIcon: react_1.default.createElement(ai_1.AiOutlineEdit, null), onClick: () => setManualEntry(true) }, "Manual Entry"))));
};
exports.default = CardBack;
//# sourceMappingURL=CardBack.js.map