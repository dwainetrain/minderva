import AddCard from './AddCard';
import React, { useState, useEffect } from 'react';
import SelectLanguage from './SelectLanguage'
import { firestore, auth, functions } from '../firebase';
import { speechLanguageMap } from './speechLanguagesMap';
import PlayAudio from './PlayAudio'
import { useStateWithCallbackInstant } from 'use-state-with-callback';
import { Helmet } from 'react-helmet-async'
import { collectIdsAndDocs } from '../utilities';
import { Link } from 'react-router-dom'
import CardFront from './CardFront'

const EditCard = (handleMessage, userLangPrefs, match, user, history) => {
    console.log("Here's a match, ", match)
    return(
        <p>Here's the edit component</p>
    )
}

export default EditCard;