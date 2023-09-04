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
const react_2 = require("@chakra-ui/react");
/* Delete button that contacts firebase to delete card from collection */
const DeleteCard = ({ id, user, handleMessage }) => {
    const remove = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        yield firebase_1.firestore.doc(`users/${user.uid}/cards/${id}`).delete();
        handleMessage('deleted', 'info');
    });
    return (react_1.default.createElement(react_2.Button, { size: "sm", variant: "ghost", colorScheme: "red", onClick: (e) => { if (window.confirm('Are you sure you wish to delete this card?'))
            remove(e); } }, "Delete Card"));
};
exports.default = DeleteCard;
//# sourceMappingURL=DeleteCard.js.map