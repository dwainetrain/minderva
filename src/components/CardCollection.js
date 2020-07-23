import React from 'react';
import DisplayCards from './DisplayCards';

const CardCollection = ({ children, handleDelete, cardCollection }) => (
    <div>
    <h2>Card Collection</h2>
        <div>
            {children}
            <DisplayCards path="/" cardCollection={cardCollection} handleDelete={handleDelete}/>
        </div>
    </div>
)

export default CardCollection;
