import React from 'react';
import { firestore } from '../firebase'
import { Button } from '@chakra-ui/react'

/* Delete button that contacts firebase to delete card from collection */

const DeleteCard = ({ id, user, handleMessage }) => {

    const remove = async (e) => {
        e.preventDefault();
        await firestore.doc(`users/${user.uid}/cards/${id}`).delete();
        handleMessage('deleted', 'info')
    }

    return (
        <Button size="sm" variant="ghost" colorScheme="red" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this card?')) remove(e) }}>Delete Card</Button>
    )
}

export default DeleteCard;