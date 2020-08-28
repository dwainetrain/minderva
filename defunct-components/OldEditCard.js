import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import { Link } from 'react-router-dom';

// match and history are props provided by React Router
const EditCard = ({ match, user, handleMessage, history }) => {
    
      const [front, setFront] = useState('');
      const [back, setBack] = useState('');
      const cardId = match.params.id;

      useEffect(() => {
        const fetchData = async () => {
          const response = await firestore.doc(`users/${user.uid}/cards/${cardId}`).get();
          const cardDetail = collectIdsAndDocs(response);
          setFront(cardDetail.front);
          setBack(cardDetail.back);
        }
        fetchData()
      }, [cardId, user.uid])

      // Update
      const update = async (e) => {
        e.preventDefault();
        const card = {front:front, back:back};
        const cardRef = firestore.doc(`users/${user.uid}/cards/${cardId}`);
        await cardRef.update(card);
        handleMessage('updated');
        // Redirects back to card collectioin using React Router history
        history.push('/card-collection')
      }

    return(
        <div>
            <p>Edit Card</p>
            <form onSubmit={update}>
             <p>{match.params.id}</p>
              <input
                type="text" 
                name="front" 
                placeholder="front"
                value={front}
                maxLength="100"
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
            <Link to="/card-collection">Cancel</Link>
          </div>
          
    )
}

export default EditCard;