import React from 'react';
import { speechLanguageMap } from './speechLanguagesMap';
import { Select } from '@chakra-ui/core'

const SelectLanguage = ({ handleLanguageSelect, selected, keyTo }) => {

      return (
        <div>
        <Select marginBottom={3} size="lg" variant="outline" onChange={handleLanguageSelect} value={selected}>
            {Object.keys(speechLanguageMap).map(lang => <option value={lang} key={lang +keyTo}>{speechLanguageMap[lang].language}</option>)}
        </Select>
       </div>
    )
}

export default SelectLanguage;