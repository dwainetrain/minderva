import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
const EditCard = ({ match, handleEdit, id, }) => {

      // YOU"RE SO CLOSE, Just need to somehow update the card on the firebase end!!!!
    
      const [front, setFront] = useState('')
      const [back, setBack] = useState('')

      const cardId = match.params.id

      useEffect(() => {
        const fetchData = async () => {
          const response = await firestore.doc(`cards/${cardId}`).get();
          const cardDetail = collectIdsAndDocs(response);
          setFront(cardDetail.front)
          setBack(cardDetail.back)
        }
        fetchData()
      }, [cardId])

    return(
        <div>
            <p>Edit a Card</p>
            {/* Controlled component form, takes in the form data into state and then updates database */}
            <form onSubmit={handleEdit}>
             <p>{id}</p>
             <p>{match.params.id}</p>
              <input
                type="text" 
                name="front" 
                placeholder="front"
                value={front}
                onChange={ e => setFront(e.target.value) }>
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