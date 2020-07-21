import React from 'react';

const DeleteCard = ({ handleDelete, id, setId }) => {
    return(
        <div>
          <h5>Delete a card</h5>
          <form onSubmit={handleDelete}>
            <input 
              type="text" 
              name="id" 
              value={id} 
              onChange={ e => setId(e.target.value) } 
              placeholder="id"
              >
            </input>
          
            <button>Delete Card</button>
          </form>
          </div>
    )
}


export default DeleteCard;