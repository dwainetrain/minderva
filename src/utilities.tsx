export const collectIdsAndDocs = (doc: any) => {
    return {
        id: doc.id,
        ...doc.data()
    };
};

export const getKeyByValue = (object: any, value: any) => {
    const names = Object.keys(object).find(key => object[key] === value);
    return names;
}