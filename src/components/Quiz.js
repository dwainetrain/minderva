import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom'

// Chakra UI
import {
    Button
} from '@chakra-ui/core'


const Quiz = ({ cardCollection }) => {

    const [quizCards, setQuizCards] = useState('');
    const [cardNumber, setCardNumber] = useState(0);
    const [cardSide, setCardSide] = useState('front');
    const [firstFlip, setFirstFlip] = useState(true);
    const [quizReset, setQuizReset] = useState(true)

    let history = useHistory();

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
        
    }, [cardCollection, quizReset])

    const nextCard = () =>{
        setCardNumber(cardNumber + 1);
        setCardSide('front')
        setFirstFlip(true)
    }

    const flipCard = () =>{
        cardSide === 'front' ? setCardSide('back') : setCardSide('front')
        setFirstFlip(false)
    }

    const displayCard = (side) => {
        
        if (quizCards[cardNumber] === undefined) {
            return <p>Review Loading...</p>
        } else if (cardSide === 'front'){
            return (
            <div>
            <p>{quizCards[cardNumber].front}</p>
                {quizCards[cardNumber].frontAudioURL ? <audio
                    controls
                    src={quizCards[cardNumber].frontAudioURL}>
                        Your browser does not support the
                        <code>audio</code> element.
                </audio> :
                null }
            </div>)
        } else {
            return (<figure>
                <figcaption>{quizCards[cardNumber].back}</figcaption>
                {quizCards[cardNumber].backAudioURL ? <audio
                    controls
                    src={quizCards[cardNumber].backAudioURL}>
                        Your browser does not support the
                        <code>audio</code> element.
                </audio> :
                null }
            </figure>)
        }
    }

    return(
    <div>        
                    {cardNumber+1 <= quizCards.length ?
                        <div>
                            <h2>{cardNumber+1}/{quizCards.length}</h2>
                            <p>{cardSide}</p>
                        
                        {/* CARD START */}
                        {/* When card is front, doesn't show next card */}
                            
                                            <header>{displayCard(cardSide)}</header>
                                     
                                            <button onClick={flipCard}>Flip Card</button>
                                        
                                            {!firstFlip ? 
                                                    <button color='red' onClick={nextCard}>
                                                        Next Card
                                                    </button> :
                                                null}
                                        
                            
                            
                            {/* CARD END */}
                        </div>
                        :
                        <div>
                            <p>Quiz Complete</p>
                            <button onClick={() => {
                            quizReset ? setQuizReset(false) : setQuizReset(true)
                            setCardNumber(0)}}>
                            Review Again</button>
                        </div>
                    }
                    <Button onClick={() => history.goBack()}>Exit Review</Button>

    </div>
     
    )
}

export default Quiz;