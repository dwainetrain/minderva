import React, { useEffect, useState } from 'react';

const Quiz = ({ cardCollection }) => {

    const [quizCards, setQuizCards] = useState('');
    const [cardNumber, setCardNumber] = useState(0);
    const [cardSide, setCardSide] = useState('front');
    
    // Function to shuffle the cards
    const shuffleCards = (cards) => cards 
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

    useEffect(() => {
        const quizData = () => {
            const cards = cardCollection.map((card, index) => { return {'order':index, ...card} })
            return shuffleCards(cards)
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
        {cardNumber+1 <= quizCards.length ?
            <div>
                <h2>{cardNumber+1} Total Cards: {quizCards.length}</h2>
                <h3>{displayCard(cardSide)}</h3>
                <p>{cardSide}</p>
                <button onClick={flipCard}>Flip Card</button>
                <button onClick={nextCard}>Next Card</button>
            </div>
            :
            <div>
                <p>Quiz Complete</p>
                <button onClick={() => setCardNumber(0)}>Review Again</button>
            </div>
        }      
    </div>
     
    )
}

export default Quiz;