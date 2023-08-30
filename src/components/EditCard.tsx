import React from 'react';
import AddCard from './AddCard';

/* Sends update mode to Add Card component */

const EditCard = ({ handleMessage, cardId, user, userLangPrefs, mode }) => {
    return (
        <AddCard
            handleMessage={handleMessage}
            cardId={cardId}
            user={user}
            mode={mode}
            userLangPrefs={userLangPrefs} />
    )
}

export default EditCard;