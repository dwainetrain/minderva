import React from 'react';
import { firestore } from '../firebase'

const DeleteCard = ({id, user, handleMessage}) => {

    const remove = async (e) => {
        e.preventDefault();
        await firestore.doc(`users/${user.uid}/cards/${id}`).delete();
        handleMessage('deleted')
    }

    return(
        <button value={id} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) remove(e) } }>Delete Card</button>
    )
}

export default DeleteCard;