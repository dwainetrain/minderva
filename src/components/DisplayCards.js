import React from 'react';

const DisplayCards = ({ cardCollection })  =>{

    return(
    cardCollection.map(
        card => 
        <div key={card.id}>
            <h4>Front: {card.front}</h4>
            <h5>Back: {card.back}</h5>
            <h6>ID: {card.id}</h6>
            <hr />
        </div>
    )
  )}


export default DisplayCards;