import React from 'react';
import DeleteCard from '../components/DeleteCard';
import { Link } from 'react-router-dom';

const DisplayCards = ({ cardCollection, user })  =>{

    return(
        cardCollection.map(
            card => 
            <div key={card.id}>
                <h4>Front: {card.front}</h4>
                <h5>Back: {card.back}</h5>
                <h6>ID: {card.id}</h6>
                <Link to={`edit-card/${card.id}`} user={user} id={card.id}>Edit</Link>{' '}
                <DeleteCard user={user} id={card.id} />
                <hr />
            </div>
        )
  )}

export default DisplayCards;