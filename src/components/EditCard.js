import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
const EditCard = ({ match, user }) => {
    
      const [front, setFront] = useState('')
      const [back, setBack] = useState('')
      const [cardId] = useState(match.params.id)

      useEffect(() => {
        const fetchData = async () => {
          const response = await firestore.doc(`users/${user.uid}/cards/${cardId}`).get();
          const cardDetail = collectIdsAndDocs(response);
          setFront(cardDetail.front)
          setBack(cardDetail.back)
          
        }
        fetchData()
      }, [cardId, user.uid])

      // Update
      const update = async (e) => {
        e.preventDefault();
        const card = {front:front, back:back};
        const cardRef = firestore.doc(`users/${user.uid}/cards/${cardId}`);
        console.log(cardRef)
        const response = await cardRef.update(card);
        console.log(response)
        setFront('');
        setBack('');
      }

    return(
        <div>
            <p>Edit a Card</p>
            <form onSubmit={update}>
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