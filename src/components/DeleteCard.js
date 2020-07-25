import React from 'react';

const DeleteCard = ({ handleRemove, id}) => {

    const handleDelete = (e) => {
        e.preventDefault();
        handleRemove(e.target.value);
    }

    return(
            <button value={id} onClick={handleDelete}>Delete Card</button>
    )
}

export default DeleteCard;