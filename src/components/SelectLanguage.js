import React, { useState, useEffect } from 'react';
import { languagesMap } from './languagesMap';
import { translate_key } from '../apis';
import { getKeyByValue } from '../utilities'
const googleTranslate = require('google-translate')(translate_key);


const SelectLanguage = ({ handleLanguageSelect, selected }) => {

    // TODO: Only Load these languages once per session! Otherwise you're making a call
    // everytime you add a card. I'm thinking the supported languages don't change that often.
    const [languages, setLanguages] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
       googleTranslate.getSupportedLanguages((err, languageCodes) => {
        const languageNames = languageCodes
        // TODO: Current language map is just a static sample, chance of inaccuracy is high
        // Find some better method of matching code to language names
        .map(code => [code, getKeyByValue(languagesMap, code)])
        .filter(name => name[1] !== undefined)
        setLanguages(languageNames);
        setLoaded(true)
      })  

    }, [])
    
      return (
        <select onChange={handleLanguageSelect} value={selected}>
            {loaded ? 
            languages.map(language => <option value={language[0]} key={language[0]}>{language[1]}</option>) : 
            <option>Loading...</option>}
        </select>
    )
}

export default SelectLanguage;