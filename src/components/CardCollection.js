import React from 'react';
import DisplayCards from './DisplayCards';
import EditCard from './EditCard';
import { Router } from '@reach/router'

const CardCollection = ({ handleDelete, cardCollection, handleEdit, id, setId, front, setFront, back, setBack }) => (
    <div>
    <h2>Card Collection</h2>
    {/* This is Closer!!!! Just need to actually edit the card and return back to display... */}
        <Router>
            <DisplayCards path="/" cardCollection={cardCollection} handleDelete={handleDelete}/>
            <EditCard path="edit-card" 
                handleAdd={handleEdit}
                setBack={setBack}
                setId={setId}
                setFront={setFront} 
                id={id}
                front={front}
                back={back}/>
        </Router>
    </div>
)

export default CardCollection;
