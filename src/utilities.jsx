export const collectIdsAndDocs = doc => { 
    return {id:doc.id, ...doc.data()}; 
};

export const getKeyByValue = (object, value) => {
    const names = Object.keys(object).find(key => object[key] === value);
    return names;
  }