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
const firebase_1 = require("../firebase");
const speechLanguagesMap_1 = require("./speechLanguagesMap");
const use_state_with_callback_1 = require("use-state-with-callback");
const react_helmet_async_1 = require("react-helmet-async");
const CardFront_1 = require("./CardFront");
const CardBack_1 = require("./CardBack");
const ai_1 = require("react-icons/ai");
// From Edit
const utilities_1 = require("../utilities");
const react_router_dom_1 = require("react-router-dom");
// Styling
const react_2 = require("@chakra-ui/react");
/*
Complex component that handles both adding and editing cards
Along with translation and text-to-speech api calls
TODO: Best candidate for more refactoring. Could I use some kind of state management to reduce complexity?

The incoming mode prop is used to decide if the component adds or updates

*/
// TODO: Move these type definitions to types folder...
const AddCard = ({ handleMessage, userLangPrefs, mode, user, cardId }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [currentMode, setCurrentMode] = (0, react_1.useState)('add');
    const [front, setFront] = (0, react_1.useState)('');
    const [back, setBack] = (0, react_1.useState)('');
    const [frontAudio, setFrontAudio] = (0, react_1.useState)('');
    const [backAudio, setBackAudio] = (0, react_1.useState)('');
    const [generateChecked, setGenerateChecked] = (0, react_1.useState)(true);
    const [originLanguageName, setOriginLanguageName] = (0, react_1.useState)('');
    const [targetLanguageName, setTargetLanguageName] = (0, react_1.useState)('');
    // State Messages
    const [loadingTranslation, setLoadingTranslation] = (0, react_1.useState)(false);
    // Add card sets to user prefs
    const [fromLanguage, setFromLanguage] = (0, react_1.useState)('');
    const [toLanguage, setToLanguage] = (0, react_1.useState)('');
    // Specific code for Google text-to-speech
    const [speechLanguage, setSpeechLanguage] = (0, react_1.useState)('');
    const [frontSpeechLanguage, setFrontSpeechLanguage] = (0, react_1.useState)('');
    // Audio States
    const [loadingAudio, setLoadingAudio] = (0, react_1.useState)('');
    // If mode is 'add' then load user prefs, if mode is update then load card data
    (0, react_1.useEffect)(() => {
        setCurrentMode(mode);
        if (userLangPrefs && currentMode === 'add') {
            setToLanguage(userLangPrefs.targetCode);
            setFromLanguage(userLangPrefs.originCode);
            setSpeechLanguage(speechLanguagesMap_1.speechLanguageMap[userLangPrefs.targetCode].ttsCode);
            setFrontSpeechLanguage(speechLanguagesMap_1.speechLanguageMap[userLangPrefs.originCode].ttsCode);
            setOriginLanguageName(speechLanguagesMap_1.speechLanguageMap[userLangPrefs.originCode].language);
            setTargetLanguageName(speechLanguagesMap_1.speechLanguageMap[userLangPrefs.targetCode].language);
        }
        else if (userLangPrefs && currentMode === 'update') {
            const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield firebase_1.firestore.doc(`users/${user.uid}/cards/${cardId}`).get();
                const cardDetail = (0, utilities_1.collectIdsAndDocs)(response);
                setFront(cardDetail.front);
                setBack(cardDetail.back);
                setFromLanguage(cardDetail.origin);
                setToLanguage(cardDetail.target);
                setOriginLanguageName(cardDetail.originLanguageName);
                setTargetLanguageName(cardDetail.targetLanguageName);
                setFrontSpeechLanguage(cardDetail.frontSpeechLanguage);
                setSpeechLanguage(cardDetail.backSpeechLanguage);
                setFrontAudio(cardDetail.frontAudioURL);
                setBackAudio(cardDetail.backAudioURL);
                setLoadingAudio('');
            });
            fetchData();
        }
    }, [userLangPrefs, cardId, user.uid, currentMode, mode]);
    // ADD CARD
    const create = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (front === '') {
            handleMessage('frontRequired');
        }
        else if (back === '') {
            handleMessage('backRequired');
        }
        else {
            try {
                const card = {
                    front: front,
                    back: back,
                    backAudioURL: backAudio,
                    frontAudioURL: frontAudio,
                    userID: firebase_1.auth.currentUser.uid,
                    origin: fromLanguage,
                    target: toLanguage,
                    backSpeechLanguage: speechLanguage,
                    frontSpeechLanguage: frontSpeechLanguage,
                    originLanguageName: originLanguageName,
                    targetLanguageName: targetLanguageName,
                    reverse: false,
                    enabled: true,
                    dateCreated: new Date(),
                    lastReview: new Date(),
                    nextReview: ''
                };
                yield firebase_1.firestore.collection(`users/${firebase_1.auth.currentUser.uid}/cards`).add(card);
                setFront('');
                setBack('');
                setFrontAudio('');
                setBackAudio('');
                setLoadingAudio('');
                handleMessage('saved', 'success');
            }
            catch (error) {
                console.error('Error Adding Card: ', error.message);
            }
        }
    });
    // Update
    const update = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const card = {
            front: front,
            back: back,
            backAudioURL: backAudio,
            frontAudioURL: frontAudio,
            userID: firebase_1.auth.currentUser.uid,
            origin: fromLanguage,
            target: toLanguage,
            backSpeechLanguage: speechLanguage,
            frontSpeechLanguage: frontSpeechLanguage,
            originLanguageName: originLanguageName,
            targetLanguageName: targetLanguageName,
            reverse: false,
            enabled: true,
        };
        const cardRef = firebase_1.firestore.doc(`users/${user.uid}/cards/${cardId}`);
        yield cardRef.update(card);
        handleMessage('updated', 'success');
        // Redirects back to card collection using React Router history
        navigate('/card-collection');
    });
    const handleFromLanguageSelect = (e) => {
        const languageCode = e.target.value;
        setFromLanguage(languageCode);
        setOriginLanguageName(speechLanguagesMap_1.speechLanguageMap[languageCode].language);
        setFrontSpeechLanguage(speechLanguagesMap_1.speechLanguageMap[languageCode].ttsCode);
    };
    const handleToLanguageSelect = (e) => {
        const languageCode = e.target.value;
        setToLanguage(languageCode);
        setTargetLanguageName(speechLanguagesMap_1.speechLanguageMap[languageCode].language);
        setSpeechLanguage(speechLanguagesMap_1.speechLanguageMap[languageCode].ttsCode);
    };
    const handleFront = (e) => {
        setFront(e.target.value);
    };
    const handleBack = (e) => {
        setBack(e.target.value);
    };
    const handleTranslate = (e) => {
        setLoadingAudio('');
        translation(e);
        setLoadingTranslation(true);
    };
    const handleGenerateChecked = (e) => {
        setGenerateChecked(e.target.checked);
    };
    const translationCall = firebase_1.functions.httpsCallable('translate');
    const translation = (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (front === '') {
            handleMessage('frontRequired', 'warning');
        }
        else if (front.length > 60) {
            handleMessage('characterLimit', 'warning');
        }
        else {
            e.preventDefault();
            try {
                translationCall({ text: front, target: toLanguage }).then((result) => {
                    setFrontAudio('');
                    setBackAudio('');
                    setBack(result.data.translation);
                    setLoadingTranslation(false);
                    if (generateChecked) {
                        setGenerateAudio(true);
                        setLoadingAudio('loading');
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    });
    const text2SpeechCall = firebase_1.functions.httpsCallable('gt2s');
    const textToSpeech = (side, text, speechLanguage) => {
        try {
            text2SpeechCall({ text: text, target: speechLanguage }).then((result) => {
                if (side === 'back') {
                    setBackAudio(result.data);
                }
                else if (side === 'front') {
                    setFrontAudio(result.data);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    // Ain't pretty, but it works
    // Should I move this to utilities?
    const handleSwap = () => {
        const swapSpace = {
            oldFront: front,
            oldBack: back,
            oldFromLanguage: fromLanguage,
            oldToLanguage: toLanguage,
            oldSpeechLanguage: speechLanguage,
            oldFrontSpeechLanguage: frontSpeechLanguage,
            oldOriginLanguageName: originLanguageName,
            oldTargetLanguageName: targetLanguageName,
            oldFrontAudio: frontAudio,
            oldBackAudio: backAudio
        };
        setFront(swapSpace.oldBack);
        setBack(swapSpace.oldFront);
        setFromLanguage(swapSpace.oldToLanguage);
        setToLanguage(swapSpace.oldFromLanguage);
        setSpeechLanguage(swapSpace.oldFrontSpeechLanguage);
        setFrontSpeechLanguage(swapSpace.oldSpeechLanguage);
        setOriginLanguageName(swapSpace.oldTargetLanguageName);
        setTargetLanguageName(swapSpace.oldOriginLanguageName);
        setFrontAudio(swapSpace.oldBackAudio);
        setBackAudio(swapSpace.oldFrontAudio);
    };
    // Call generate audio when set to true by translation
    const [generateAudio, setGenerateAudio] = (0, use_state_with_callback_1.useStateWithCallbackInstant)(false, () => {
        if (generateAudio === true && generateChecked) {
            textToSpeech('front', front, frontSpeechLanguage);
            textToSpeech('back', back, speechLanguage);
            setGenerateAudio(false);
        }
    });
    const handleManualGenerateAudio = () => {
        if (front === '') {
            handleMessage('frontRequired', 'warning');
        }
        else if (back === '') {
            handleMessage('backRequired', 'warning');
        }
        else {
            setFrontAudio('');
            setBackAudio('');
            setLoadingAudio('loading');
            setGenerateAudio(true);
        }
    };
    return (react_1.default.createElement(react_2.Stack, { px: { sm: 10, md: 24 }, pt: "1rem", maxWidth: "1200px" },
        react_1.default.createElement(react_helmet_async_1.Helmet, null,
            react_1.default.createElement("title", null,
                "Minderva | ",
                mode === 'add' ? 'Add Cards' : 'Edit Card')),
        react_1.default.createElement(react_2.Heading, { as: "h2", size: "md", pb: 3 }, mode === 'add' ? "Add a card" : 'Edit your card'),
        react_1.default.createElement(react_2.Flex, { justifyContent: "space-between", flexDirection: { sm: "column", md: "row" }, alignItems: { sm: "center", md: "flex-start" } },
            react_1.default.createElement(CardFront_1.default, { toLanguage: toLanguage, loadingAudio: loadingAudio, frontAudio: frontAudio, handleFromLanguageSelect: handleFromLanguageSelect, fromLanguage: fromLanguage, front: front, handleFront: handleFront }),
            react_1.default.createElement(react_2.Tooltip, { "aria-label": "Swap Sides", label: "Swap Sides", placement: "top", bg: "grayGreen.200", color: "grayGreen.800" },
                react_1.default.createElement(react_2.IconButton, { alignSelf: "center", variant: "link", colorScheme: "blackAlpha", "aria-label": "Swap Card Sides", fontSize: "36px", size: "md", icon: react_1.default.createElement(ai_1.AiOutlineSwap, null), onClick: handleSwap, maxH: 16 })),
            react_1.default.createElement(CardBack_1.default, { fromLanguage: fromLanguage, loadingAudio: loadingAudio, backAudio: backAudio, handleToLanguageSelect: handleToLanguageSelect, toLanguage: toLanguage, back: back, handleBack: handleBack, front: front, handleTranslate: handleTranslate, handleGenerateChecked: handleGenerateChecked, handleManualGenerateAudio: handleManualGenerateAudio, loadingTranslation: loadingTranslation, manual: mode === 'update' ? true : false })),
        react_1.default.createElement(react_2.Flex, { justifyContent: "center" },
            react_1.default.createElement(react_2.Flex, { width: "100%", justifyContent: { sm: "center", md: "flex-end" }, mb: 5 }, mode === 'add' ?
                react_1.default.createElement(react_2.Button, { colorScheme: "whatsapp", leftIcon: react_1.default.createElement(ai_1.AiOutlinePlus, null), onClick: create, "aria-label": "Add Card" }, "Add Card")
                :
                    react_1.default.createElement(react_2.Box, { display: "flex", justifyContent: "space-between", alignItems: "center" },
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/card-collection" },
                            react_1.default.createElement(react_2.Button, { as: "a", variant: "link", mr: 10, color: "grayGreen.800" }, "Cancel")),
                        react_1.default.createElement(react_2.Button, { colorScheme: "whatsapp", onClick: update }, "Update Card"))))));
};
exports.default = AddCard;
//# sourceMappingURL=AddCard.js.map