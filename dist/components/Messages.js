"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/* Messages map for messaging system */
const Message = ({ type }) => {
    const messages = {
        saved: "Your new card has been added",
        updated: "Edit successful",
        deleted: "Card deleted",
        frontRequired: "Front of the card can't be blank",
        backRequired: "Back of the card can't be blank",
        characterLimit: "Sorry, there's a 50 character limit per card."
    };
    return (react_1.default.createElement("div", { className: `App-message ${type}` },
        react_1.default.createElement("p", { className: "containter" },
            react_1.default.createElement("strong", null, messages[type]))));
};
exports.default = Message;
//# sourceMappingURL=Messages.js.map