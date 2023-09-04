"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyByValue = exports.collectIdsAndDocs = void 0;
const collectIdsAndDocs = doc => {
    return Object.assign({ id: doc.id }, doc.data());
};
exports.collectIdsAndDocs = collectIdsAndDocs;
const getKeyByValue = (object, value) => {
    const names = Object.keys(object).find(key => object[key] === value);
    return names;
};
exports.getKeyByValue = getKeyByValue;
//# sourceMappingURL=utilities.js.map