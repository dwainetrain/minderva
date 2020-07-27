import React from 'react';
import { translate_key } from '../apis';
const googleTranslate = require('google-translate')(translate_key);

const SelectLanguage = ({ handleLanguageSelect }) => {

    // so I don't want to call the api everytime we just need to list out available languages,
    // instead just call once and store it
    // 
    // const testArray = ['a', 'b', 'c', 'd', 'e', 'f']

    // const testList = () => {
    //     return testArray
    //     .map(letter => console.log(letter))
    // }

    // console.log(testList())

    // This is tripping you up! It works in console.log but not when trying to map over it?????
    const languageList = () => {
        googleTranslate.getSupportedLanguages(async (err, languageCodes) => {
        // return languageCodes.map(code => console.log(typeof code));
        // => ['af', 'ar', 'be', 'bg', 'ca', 'cs', ...]
        // [...languageCodes].map(code => <option value={code}>{code}</option>)
        return await languageCodes;
      })
    }

    console.log(languageList())
    
      return (
        <select onChange={handleLanguageSelect}>
            {/* {languageList} */}
        </select>
    )
}

export default SelectLanguage;