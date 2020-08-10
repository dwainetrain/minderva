import React, { useState } from 'react';
import SelectLanguage from './SelectLanguage'
import { firestore, auth, functions } from '../firebase';

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

    const handleFromLanguageSelect = (e) => {
        setFromLanguage(e.target.value)
    }

    const handleToLanguageSelect = (e) => {
        setToLanguage(e.target.value)
    }

    const translationCall = functions.httpsCallable('translate');
    
    const translation = (e) => {
        if (front === '') {
            handleMessage('frontRequired')
        } else {
        e.preventDefault();
            try{
                translationCall({text:front,target:toLanguage}).then((result) => {
                    setBack(result.data.translation)
                })
            }
            catch(error) {
                    console.log(error)
            }
        }
    }

    return (
        <div>
            <p>Add a Card</p>

            <span>Translate From: <SelectLanguage 
                handleLanguageSelect={handleFromLanguageSelect}
                selected={fromLanguage} keyTo="text"/></span>{' '}
                
            <span>Translate To: <SelectLanguage 
                handleLanguageSelect={handleToLanguageSelect}
                selected={toLanguage} keyTo="target"/></span>
            <form onSubmit={create}>
                <input
                type="text"
                name="front"
                placeholder="front"
                value={front}
                onChange={e => setFront(e.target.value)}
                maxLength="50"
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
                <button type='button' onClick={translation}>Translate</button>
                <button>Add Card</button>
            </form>
        </div>
    )}

export default AddCard;