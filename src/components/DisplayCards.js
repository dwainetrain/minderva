import React from 'react';
import DeleteCard from '../components/DeleteCard';
import { Link } from 'react-router-dom';

const DisplayCards = ({ cardCollection, handleEdit, handleRemove, id, setId, front, setFront, back, setBack })  =>{

    return(
        cardCollection.map(
            card => 
            <div key={card.id}>
                <h4>Front: {card.front}</h4>
                <h5>Back: {card.back}</h5>
                <h6>ID: {card.id}</h6>
                <Link to={`edit-card/${card.id}`} id={card.id}>Edit</Link>{' '}
                <DeleteCard handleRemove={handleRemove} id={card.id}/>
                <hr />
            </div>
        )
  )}

export default DisplayCards;