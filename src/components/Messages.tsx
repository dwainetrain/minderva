import React from 'react';
import { messages } from './constants/messages'

/* Messages map for messaging system */

const Message = ({ type }: { [key: string]: string }) => {
    return (
        <div className={`App-message ${type}`}>
            <p className="container">
                <strong>{messages[type]}</strong>
            </p>
        </div>
    )
}

export default Message;