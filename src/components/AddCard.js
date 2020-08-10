import React, { useState } from 'react';
import SelectLanguage from './SelectLanguage'
import { firestore, auth, functions } from '../firebase';
import { translate_key } from '../apis';
const translate = require('google-translate')(translate_key).translate;




const AddCard = ({ handleMessage }) => {

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    
    //This will eventually be a default set in user profile
    const [fromLanguage, setFromLanguage] = useState('en');
    const [toLanguage, setToLanguage] = useState('es');

    const create = async (e) => {
        e.preventDefault();
        if (front === '') {
            handleMessage('frontRequired')
        } else if (back === ''){
            handleMessage('backRequired')
        } else {
            try {
                const card = {front:front, back:back, userID:auth.currentUser.uid}
                await firestore.collection(`users/${auth.currentUser.uid}/cards`).add(card);
                setFront('');
                setBack('');
                handleMessage('saved');
            } catch(error) {
                console.error('Error Adding Card: ', error.message)
            }
            
        }
    }

    const translation = async (e) => {
        e.preventDefault();
        await translate(front, toLanguage, function(err, translation) {
            setBack(translation.translatedText);
          });
    }

    const handleFromLanguageSelect = (e) => {
        setFromLanguage(e.target.value)
    }

    const handleToLanguageSelect = (e) => {
        setToLanguage(e.target.value)
    }

    /////////TESTING CLOUD FUNCTION/////////////
    const translationCall = functions.httpsCallable('translate');
    
    const testTranslation = (text) => {
        try{
            translationCall(text).then((result) => {
                console.log(result)
            })
        }
        catch(error) {
                console.log(error)
        }
    }

    ///////////////////////

    return (
        <div>
            <p>Add a Card</p>

            <span>Translate From: <SelectLanguage 
                handleLanguageSelect={handleFromLanguageSelect}
                selected={fromLanguage}/></span>{' '}
                
            <span>Translate To: <SelectLanguage 
                handleLanguageSelect={handleToLanguageSelect}
                selected={toLanguage}/></span>
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
            <button onClick={() => testTranslation(front)}>Test Translation</button>
        </div>
    )}

export default AddCard;