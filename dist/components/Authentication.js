"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const CurrentUser_1 = require("./CurrentUser");
const LogIn_1 = require("./LogIn");
/* Checks authentication of user, if user is valid, display user profile, otherwise back to login */
const Authentication = ({ user, userLangPrefs, handleMessage }) => {
    return (react_1.default.createElement("div", null, user ? react_1.default.createElement(CurrentUser_1.default, Object.assign({}, user, { userLangPrefs: userLangPrefs, handleMessage: handleMessage })) : react_1.default.createElement(LogIn_1.default, null)));
};
exports.default = Authentication;
//# sourceMappingURL=Authentication.js.map