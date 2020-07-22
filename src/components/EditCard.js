import React from 'react';

const EditCard = ({ handleEdit, id, setId, front, setFront, back, setBack}) => {
  console.log('You made it into the component!')
    return(
        <div>
            <p>Edit a Card</p>
            {/* Controlled component form, takes in the form data into state and then updates database */}
            <form onSubmit={handleEdit}>
              <input 
                type="text" 
                name="id" 
                value={id} 
                onChange={ e => setId(e.target.value) } 
                placeholder="id"
                >
              </input>
              <input 
                type="text" 
                name="front" 
                placeholder="front"
                value={front} 
                onChange={ e => setFront(e.target.value) }
                >
              </input>
              <input 
              type="text" 
              name="back" 
              placeholder="back"
              value={back} 
              onChange={ e => setBack(e.target.value) }
              >
              </input>
              <button>Edit Card</button>
            </form>
          </div>
    )
}

export default EditCard;