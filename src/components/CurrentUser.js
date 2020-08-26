import React, { useState, useEffect } from 'react';
import SignOut from './SignOut';
import SelectLanguage from './SelectLanguage'
import { firestore } from '../firebase';
import { Helmet } from 'react-helmet-async'

// Styling
import {
    Stack,
    Text,
    Heading,
    Divider
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
        handleMessage('languageUpdate', 'success')
      }
     
    return(
        <Stack spacing={2} px="10rem" py="3rem" maxWidth={[
            "100%", // base
            "75%", // 480px upwards
            "75%", // 768px upwards
            "50%", // 992px upwards
          ]}>
            <Helmet>
                <title>Minderva | User Profile</title>
            </Helmet>    
            <Heading>User Profile Page</Heading>
            <Divider />
            
            <Text>Google email for this account: </Text>
            <Text fontStyle="italic">{email}</Text>

            <Divider />
            <Text>Default Origin Language: </Text>
            {!toLanguage ? <Text>Loading Languages</Text> :
            <SelectLanguage 
                    handleLanguageSelect={handleFromLanguageSelect}
                    selected={fromLanguage} keyTo="text"/>}

            <Text>Default Target Language:</Text>
            {!toLanguage ? <Text>Loading Languages</Text> :
                    <SelectLanguage 
                    handleLanguageSelect={handleToLanguageSelect}
                    selected={toLanguage} keyTo="target"/>}
        </Stack>
    )
}

export default CurrentUser;