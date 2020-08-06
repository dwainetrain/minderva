import React from 'react';

const Message = ({ type }) => {
    const messages = {
        saved: "Your new card has been added",
        updated: "Edit successful",
        deleted: "Card deleted"
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