import React from 'react';
import { firestore } from '../firebase'

const DeleteCard = ({id}) => {

    const remove = async (e) => {
        e.preventDefault();
        await firestore.doc(`cards/${id}`).delete(); 
    }

    return(
        <button value={id} onClick={remove}>Delete Card</button>
    )
}

export default DeleteCard;