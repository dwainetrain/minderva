import React, { useState } from 'react';
import SelectLanguage from './SelectLanguage'

import { firestore } from '../firebase';
import { translate_key } from '../apis';
const translate = require('google-translate')(translate_key).translate;


const AddCard = () => {

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [toLanguage, setToLanguage] = useState('es'); //This will eventually be a default set in user profile
    const [fromLanguage, setFrontLanguage] = useState('');

    const create = async (e) => {
        e.preventDefault();
        const card = {front:front, back:back}
        await firestore.collection('cards').add(card);
        setFront('');
        setBack('');
    }

    const translation = async (e) => {
        e.preventDefault();
        await translate(front, toLanguage, function(err, translation) {
            setBack(translation.translatedText);
          });
    }

    const handleLanguageSelect = (e) => {
        setToLanguage(e.target.value)
    }

    // usability would be enter word, tab over enter to manual entry, tab tab enter would translate
    
    return (
        <div>
            <p>Add a Card</p>
        {/* Controlled component form, 
        takes in the form data into state 
        and then updates database on submit*/}
            <div><p>Translate To:</p><SelectLanguage handleLanguageSelect={handleLanguageSelect}/></div>
            <form onSubmit={create}>
                <input
                type="text"
                name="front"
                placeholder="front"
                value={front}
                onChange={e => setFront(e.target.value)}
                >
                </input>

                <input
                type="text"
                name="back"
                placeholder="back"
                value={back}
                onChange={e => setBack(e.target.value)}
                >
                </input>
                <button type='button' onClick={translation}>Translate Word</button>
                <button>Add Card</button>
            </form>
            
        </div>
    )}

export default AddCard;