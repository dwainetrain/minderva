"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const UserRoute_1 = require("./UserRoute");
const LogIn_1 = require("./LogIn");
const Messages_1 = require("./Messages");
// import LogInWithEmail from './LogInWithEmail'
const react_router_dom_1 = require("react-router-dom");
const firebase_1 = require("../firebase");
// import { collection, doc, setDoc } from "firebase/firestore";
const utilities_1 = require("../utilities");
/// Styling
require("./App.css");
const react_2 = require("@chakra-ui/react");
function App() {
    const [cardCollection, setCardCollection] = (0, react_1.useState)([]);
    // For User Language Prefs
    const [userLanguagePreferences, setUserLanguagePreferences] = (0, react_1.useState)('');
    // Auth state
    const [user, setUser] = (0, react_1.useState)(null);
    const [message, setMessage] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [cardsLoaded, setCardsLoaded] = (0, react_1.useState)(false);
    // streaming the database, being sure to unsubscribe to avoid memory leaks, I think...
    (0, react_1.useEffect)(() => {
        const unsubscribeFromFirestore = firebase_1.firestore.collection(`${user ? `users/${user.uid}/cards` : null}`)
            .onSnapshot(snapshot => {
            const entries = snapshot.docs.map(utilities_1.collectIdsAndDocs);
            setCardCollection(entries);
            setCardsLoaded(true);
        });
        const unsubscribeFromUserProfile = firebase_1.firestore.collection(`users`)
            .doc(`${user ? user.uid : null}`)
            .collection('profile')
            .onSnapshot(snapshot => {
            const entries = snapshot.docs.map(utilities_1.collectIdsAndDocs);
            setUserLanguagePreferences(entries[0]);
        });
        const unsubscribeFromAuth = firebase_1.auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
        return () => {
            unsubscribeFromFirestore();
            unsubscribeFromAuth();
            unsubscribeFromUserProfile();
        };
    }, [user]);
    // handle messages with Chakra Toasts
    const messages = {
        saved: "Your new card has been added",
        languageUpdate: "Language Preferences Updated",
        updated: "Card updated",
        deleted: "Card deleted",
        frontRequired: "Front of the card can't be blank",
        backRequired: "Back of the card can't be blank",
        characterLimit: "Sorry, there's a 50 character limit per card."
    };
    const toast = (0, react_2.useToast)();
    const handleMessage = (message, status) => {
        toast({
            position: "bottom",
            description: messages[message],
            status: status,
            duration: 3000,
            isClosable: false,
        });
        setMessage('');
    };
    return (react_1.default.createElement("div", { className: "App" },
        loading ? react_1.default.createElement("p", null, "Loading...") :
            user ? react_1.default.createElement(UserRoute_1.default, { user: user, userLangPrefs: userLanguagePreferences, cardCollection: cardCollection, handleMessage: handleMessage, loading: loading, cardsLoaded: cardsLoaded }) :
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(LogIn_1.default, null)),
        message && react_1.default.createElement(Messages_1.default, { type: message }),
        react_1.default.createElement(react_2.Box, { as: "footer", backgroundColor: "grayGreen.200" },
            react_1.default.createElement(react_2.Box, { pl: { sm: 10, md: 24 } },
                react_1.default.createElement(react_router_dom_1.Link, { to: "/about" }, "MVP Build 0.14")))));
}
exports.default = App;
//# sourceMappingURL=App.js.map