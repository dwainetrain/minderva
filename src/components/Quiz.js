import React, { useEffect, useState } from 'react';

const Quiz = ({ cardCollection }) => {

    const [quizCards, setQuizCards] = useState('');
    const [cardNumber, setCardNumber] = useState(0);
    const [cardSide, setCardSide] = useState('front');
    
    // I'm not using the original index, because in the future I want to assign random order to the cards

    useEffect(() => {
        const quizData = () => {
            return cardCollection.map((card, index) => { return {'order':index, ...card} })
        }
        setQuizCards(quizData())
    }, [cardCollection])

    const nextCard = () =>{
        setCardNumber(cardNumber + 1);
        setCardSide('front')
    }

    const flipCard = () =>{
        cardSide === 'front' ? setCardSide('back') : setCardSide('front')
    }

    const displayCard = (side) => {
        return (quizCards[cardNumber] === undefined ? 'Loading...': quizCards[cardNumber][side])
    }

    return(
    <div>
        <h3>Quiz Page</h3>
        <h3>{displayCard(cardSide)}</h3>
        <button onClick={flipCard}>Flip Card</button>
        <button onClick={nextCard}>Next Card</button>
    </div>
     
    )
}

export default Quiz;