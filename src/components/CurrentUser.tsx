import React, { useState, useEffect } from 'react';
import SelectLanguage from './SelectLanguage'
import { firestore } from '../firebase';
import { Helmet } from 'react-helmet-async'

// Styling
import {
    Stack,
    Text,
    Heading,
    Divider
} from '@chakra-ui/react'
import { UserWithActions as User } from './@types/card';

/* User Profile page, allowing for setting user preferences */

const CurrentUser = ({ email, userLangPrefs, handleMessage, uid }: User) => {

    const [fromLanguage, setFromLanguage] = useState<string | undefined>('');
    const [toLanguage, setToLanguage] = useState<string | undefined>('');

    // Load Lang Prefs
    // Set default preferences
    useEffect(() => {
        setFromLanguage(userLangPrefs?.originCode)
        setToLanguage(userLangPrefs?.targetCode)
    }, [userLangPrefs])

    // TODO: FROM and TO are taking the event of the change from select language
    const handleFromLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const languageCode = e.target.value
        setFromLanguage(languageCode)
        update('origin', languageCode)
    }

    const handleToLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const languageCode = e.target.value
        setToLanguage(languageCode)
        update('target', languageCode)
    }

    const update = async (pref: string, code: string) => {
        const languages = pref === 'target' ? { targetCode: code } : { originCode: code }
        const cardRef = firestore.doc(`users/${uid}/profile/${uid}`);
        await cardRef.update(languages);
        if (handleMessage) handleMessage('languageUpdate', 'success');
    }

    return (
        <Stack spacing={2} px={{ sm: 10, md: 24 }} py={4} maxWidth={[
            "100%", // base
            "75%", // 480px upwards
            "75%", // 768px upwards
            "50%", // 992px upwards
        ]}>
            <Helmet>
                <title>Minderva | User Profile</title>
            </Helmet>
            <Heading as="h2" size="md">User Profile Page</Heading>
            <Divider />

            <Text>Google email for this account: </Text>
            <Text fontStyle="italic">{email}</Text>

            <Divider />
            <Text>Default Origin Language: </Text>
            {!toLanguage ? <Text>Loading Languages</Text> :
                <SelectLanguage
                    handleLanguageSelect={handleFromLanguageSelect}
                    selected={fromLanguage!} keyTo="text" />}

            <Text>Default Target Language:</Text>
            {!toLanguage ? <Text>Loading Languages</Text> :
                <SelectLanguage
                    handleLanguageSelect={handleToLanguageSelect}
                    selected={toLanguage} keyTo="target" />}
        </Stack>
    )
}

export default CurrentUser;