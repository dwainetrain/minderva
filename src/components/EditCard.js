import React from 'react';
import AddCard from './AddCard';


const EditCard = ({ handleMessage, match, user, history, userLangPrefs }) => {
    return(
        <AddCard 
         handleMessage={handleMessage}
         cardId={match.params.id}
         user={user}
         history={history}
         mode="update" 
         userLangPrefs={userLangPrefs} />
    )  
}

export default EditCard;