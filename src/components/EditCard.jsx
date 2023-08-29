import React from 'react';
import AddCard from './AddCard';

/* Sends update mode to Add Card component */

const EditCard = ({ handleMessage, cardId, user, history, userLangPrefs, mode }) => {
    return (
        <AddCard
            handleMessage={handleMessage}
            cardId={cardId}
            user={user}
            history={history}
            mode={mode}
            userLangPrefs={userLangPrefs} />
    )
}

export default EditCard;