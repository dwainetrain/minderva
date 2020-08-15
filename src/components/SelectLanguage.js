import React from 'react';
import { languagesMap } from './languagesMap';
import { speechLanguages } from './speechLanguagesMap';
import { getKeyByValue } from '../utilities'

const SelectLanguage = ({ handleLanguageSelect, selected, keyTo }) => {

    // Static List of Google Translate supported languages, will have to be periodically updated
    // I don't expect it to change much, so I'm saving on the api calls

    const languageISO = ['af','am','ar','az','be','bg','bn','bs','ca','ceb','co','cs','cy','da','de','el','en','eo','es','et','eu','fa','fi','fr','fy','ga','gd','gl','gu','ha','haw','he','hi','hmn','hr','ht','hu','hy','id','ig','is','it','iw','ja','jw','ka','kk','km','kn','ko','ku','ky','la','lb','lo','lt','lv','mg','mi','mk','ml','mn','mr','ms','mt','my','ne','nl','no','ny','or','pa','pl','ps','pt','ro','ru','rw','sd','si','sk','sl','sm','sn','so','sq','sr','st','su','sv','sw','ta','te','tg','th','tk','tl','tr','tt','ug','uk','ur','uz','vi','xh','yi','yo','zh','zh-CN','zh-TW','zu']

    const languages = languageISO
                      .map(code => [code, getKeyByValue(languagesMap, code)])
                      .filter(name => name[1] !== undefined)
    
    const languagesMapping = languages


      return (
        <div>
        <select onChange={handleLanguageSelect} value={selected}>
            {languages.map(language => <option value={language[0]} key={language[0]+keyTo}>{language[1]}</option>)}
            <p><pre>{JSON.stringify(languagesMapping, null, 2)}</pre></p>
        </select>
        </div>
    )
}

export default SelectLanguage;