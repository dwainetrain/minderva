import React from 'react';

const DeleteCard = ({ handleDelete, id}) => {
    return(
            <button value={id} onClick={handleDelete}>Delete Card</button>
    )
}

export default DeleteCard;