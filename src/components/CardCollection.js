import React from 'react';
import DisplayCards from './DisplayCards';

const CardCollection = ({ children, handleRemove, cardCollection }) => (
    <div>
    <h2>Card Collection</h2>
        <div>
            {children}
            <DisplayCards path="/" cardCollection={cardCollection} handleRemove={handleRemove}/>
        </div>
    </div>
)

export default CardCollection;
