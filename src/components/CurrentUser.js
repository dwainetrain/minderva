import React, { useState, useEffect } from 'react';
import SignOut from './SignOut';
import SelectLanguage from './SelectLanguage'
import { firestore } from '../firebase';
import { Helmet } from 'react-helmet-async'

// Styling
import {
    Stack,
    Text
} from '@chakra-ui/core'

const CurrentUser = ({ displayName, email, userLangPrefs, handleMessage, user, uid }) => {
    
    // This will eventually be a default set in user profile
    const [fromLanguage, setFromLanguage] = useState('');
    const [toLanguage, setToLanguage] = useState('');

    // Load Lang Prefs
    // Set default preferences
    useEffect(() => {
        setFromLanguage(userLangPrefs.originCode)
        setToLanguage(userLangPrefs.targetCode)
    }, [userLangPrefs])

    const handleFromLanguageSelect = async (e) => {
    const languageCode = await e.target.value
    setFromLanguage(languageCode)
    update('origin', languageCode)
    }

    const handleToLanguageSelect = async (e) => {
        const languageCode = await e.target.value
        setToLanguage(await languageCode)
        update('target', languageCode)
    }

    const update = async (pref, code) => {
        const languages = pref === 'target' ? {targetCode:code} : {originCode:code}
        const cardRef = firestore.doc(`users/${uid}/profile/${uid}`);
        await cardRef.update(languages);
        handleMessage('updated')
      }
     
    return(
        <Stack spacing={2} px="10rem">
            <Helmet>
                <title>Minderva | User Profile</title>
            </Helmet>    
            <h2>User Profile Page</h2>
            <p>Hello {displayName}!</p>
            <p>Google email for this account: {email}</p>
            <p>Default Origin Language: </p>
            {!toLanguage ? <Text>Loading Languages</Text> :
            <SelectLanguage 
                    handleLanguageSelect={handleFromLanguageSelect}
                    selected={fromLanguage} keyTo="text"/>}

            <p>Default Target Language:</p>
            {!toLanguage ? <Text>Loading Languages</Text> :
                    <SelectLanguage 
                    handleLanguageSelect={handleToLanguageSelect}
                    selected={toLanguage} keyTo="target"/>}
            <p>Be sure to show messages on option saves</p>
            <SignOut />
        </Stack>
    )
}

export default CurrentUser;