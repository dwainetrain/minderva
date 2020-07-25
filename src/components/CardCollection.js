import React from 'react';
import DisplayCards from './DisplayCards';

const CardCollection = ({ children, cardCollection }) => (
    <div>
    <h2>Card Collection</h2>
        <div>
            {/* {children} */}
            <DisplayCards path="/" cardCollection={cardCollection} />
        </div>
    </div>
)

export default CardCollection;
