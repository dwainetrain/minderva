import React from 'react';
import DeleteCard from '../components/DeleteCard';
import { Link } from '@reach/router'

const DisplayCards = ({ cardCollection, handleEdit, handleDelete, id, setId, front, setFront, back, setBack })  =>{

    return(
        cardCollection.map(
            card => 
            <div key={card.id}>
                <h4>Front: {card.front}</h4>
                <h5>Back: {card.back}</h5>
                <h6>ID: {card.id}</h6>
                <Link to='edit-card'>Edit</Link>{' '}
                <DeleteCard handleDelete={handleDelete} id={card.id}/>
                <hr />
            </div>
        )
  )}

export default DisplayCards;