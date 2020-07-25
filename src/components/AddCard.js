import React, { useState } from 'react';
import { firestore } from '../firebase';

// It works, but there's got to be an easier way of passing all this info...
const AddCard = () => {

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const create = async (e) => {
        e.preventDefault();
        const card = {front:front, back:back}
        await firestore.collection('cards').add(card);
        setFront('');
        setBack('');
    }
    
    return (
        <div>
            <p>Add a Card</p>
        {/* Controlled component form, 
        takes in the form data into state 
        and then updates database on submit*/}
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
            <button>Add Card</button>
            </form>
        </div>
    )}

export default AddCard;