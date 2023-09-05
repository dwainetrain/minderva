import React from 'react';
import { speechLanguageMap } from './constants/speechLanguagesMap';
import { Select } from '@chakra-ui/react'

/* Language selection using imported handmade language map */

const SelectLanguage = ({ handleLanguageSelect, selected, keyTo }: { handleLanguageSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void; selected: string; keyTo: string }) => {
    return (
        <div>
            <Select marginBottom={3} size="lg" variant="outline" onChange={handleLanguageSelect} value={selected}>
                {Object.keys(speechLanguageMap).map(lang => <option value={lang} key={lang + keyTo}>{speechLanguageMap[lang].language}</option>)}
            </Select>
        </div>
    )
}

export default SelectLanguage;