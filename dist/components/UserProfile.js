"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Authentication_1 = require("./Authentication");
/* Calls for authentication of user, maybe redundant */
const UserProfile = ({ user, userLangPrefs, handleMessage }) => (react_1.default.createElement("div", null,
    react_1.default.createElement(Authentication_1.default, { user: user, userLangPrefs: userLangPrefs, handleMessage: handleMessage })));
exports.default = UserProfile;
//# sourceMappingURL=UserProfile.js.map