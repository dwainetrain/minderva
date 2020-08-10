import React from 'react';

const Message = ({ type }) => {
    const messages = {
        saved: "Your new card has been added",
        updated: "Edit successful",
        deleted: "Card deleted",
        frontRequired: "Front of the card can't be blank",
        backRequired: "Back of the card can't be blank",
        characterLimit: "Sorry, there's a 50 character limit per card."
    }

    return (
        <div className={`App-message ${type}`}>
            <p className="containter">
                <strong>{messages[type]}</strong>
            </p>
        </div>
    )
}

export default Message;