import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import { Link, Redirect } from 'react-router-dom';

const EditCard = ({ match, user, handleMessage }) => {
    
      const [front, setFront] = useState('')
      const [back, setBack] = useState('')
      const [cardId] = useState(match.params.id)
      const [redirect, setRedirect] = useState(null);

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
        const response = await cardRef.update(card);
        console.log(response) // should this be a form of error handling, try catch?
        setFront('');
        setBack('');
        handleMessage('updated');
        setRedirect(true)
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
            {redirect ? <Redirect to="/card-collection" /> : null}
            <Link to="/card-collection">Cancel</Link>
          </div>
          
    )
}

export default EditCard;