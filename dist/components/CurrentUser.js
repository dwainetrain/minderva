"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const SelectLanguage_1 = require("./SelectLanguage");
const firebase_1 = require("../firebase");
const react_helmet_async_1 = require("react-helmet-async");
// Styling
const react_2 = require("@chakra-ui/react");
/* User Profile page, allowing for setting user preferences */
const CurrentUser = ({ email, userLangPrefs, handleMessage, uid }) => {
    const [fromLanguage, setFromLanguage] = (0, react_1.useState)('');
    const [toLanguage, setToLanguage] = (0, react_1.useState)('');
    // Load Lang Prefs
    // Set default preferences
    (0, react_1.useEffect)(() => {
        setFromLanguage(userLangPrefs.originCode);
        setToLanguage(userLangPrefs.targetCode);
    }, [userLangPrefs]);
    const handleFromLanguageSelect = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const languageCode = yield e.target.value;
        setFromLanguage(languageCode);
        update('origin', languageCode);
    });
    const handleToLanguageSelect = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const languageCode = yield e.target.value;
        setToLanguage(yield languageCode);
        update('target', languageCode);
    });
    const update = (pref, code) => __awaiter(void 0, void 0, void 0, function* () {
        const languages = pref === 'target' ? { targetCode: code } : { originCode: code };
        const cardRef = firebase_1.firestore.doc(`users/${uid}/profile/${uid}`);
        yield cardRef.update(languages);
        handleMessage('languageUpdate', 'success');
    });
    return (react_1.default.createElement(react_2.Stack, { spacing: 2, px: { sm: 10, md: 24 }, py: 4, maxWidth: [
            "100%",
            "75%",
            "75%",
            "50%", // 992px upwards
        ] },
        react_1.default.createElement(react_helmet_async_1.Helmet, null,
            react_1.default.createElement("title", null, "Minderva | User Profile")),
        react_1.default.createElement(react_2.Heading, { as: "h2", size: "md" }, "User Profile Page"),
        react_1.default.createElement(react_2.Divider, null),
        react_1.default.createElement(react_2.Text, null, "Google email for this account: "),
        react_1.default.createElement(react_2.Text, { fontStyle: "italic" }, email),
        react_1.default.createElement(react_2.Divider, null),
        react_1.default.createElement(react_2.Text, null, "Default Origin Language: "),
        !toLanguage ? react_1.default.createElement(react_2.Text, null, "Loading Languages") :
            react_1.default.createElement(SelectLanguage_1.default, { handleLanguageSelect: handleFromLanguageSelect, selected: fromLanguage, keyTo: "text" }),
        react_1.default.createElement(react_2.Text, null, "Default Target Language:"),
        !toLanguage ? react_1.default.createElement(react_2.Text, null, "Loading Languages") :
            react_1.default.createElement(SelectLanguage_1.default, { handleLanguageSelect: handleToLanguageSelect, selected: toLanguage, keyTo: "target" })));
};
exports.default = CurrentUser;
//# sourceMappingURL=CurrentUser.js.map