import React from 'react';
import { firestore } from '../firebase'

const DeleteCard = ({id, user}) => {

    const remove = async (e) => {
        e.preventDefault();
        await firestore.doc(`users/${user.uid}/cards/${id}`).delete();
    }

    return(
        <button value={id} onClick={remove}>Delete Card</button>
    )
}

export default DeleteCard;