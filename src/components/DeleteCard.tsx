import React from 'react';
import { firestore } from '../firebase'
import { Button } from '@chakra-ui/react'
import { CardAction } from './@types/card';

/* Delete button that contacts firebase to delete card from collection */

const DeleteCard = ({ cardId, user, handleMessage }: CardAction) => {

    const remove = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (user) firestore.doc(`users/${user.uid}/cards/${cardId}`).delete();
        if (handleMessage) handleMessage('deleted', 'info');
    }

    return (
        <Button size="sm" variant="ghost" colorScheme="red" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this card?')) remove(e) }}>Delete Card</Button>
    )
}

export default DeleteCard;