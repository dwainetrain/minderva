import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom'

// Chakra UI
import {
    Button,
    Flex,
    Box,
    PseudoBox,
    Heading,
    Text,
    Tooltip
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
            <Box border="2px solid green" px="10rem" py="8rem">
            <Text fontFamily="Playfair Display" fontSize="lg">{quizCards[cardNumber].front}</Text>
                {quizCards[cardNumber].frontAudioURL ? <audio
                    controls
                    src={quizCards[cardNumber].frontAudioURL}>
                        Your browser does not support the
                        <code>audio</code> element.
                </audio> :
                null }
            </Box>)
        } else {
            return (
            <Box border="2px solid green" px="10rem" py="8rem">
            <Text fontFamily="Playfair Display" fontSize="lg">{quizCards[cardNumber].back}</Text>
            <figure>
                {quizCards[cardNumber].backAudioURL ? <audio
                    controls
                    src={quizCards[cardNumber].backAudioURL}>
                        Your browser does not support the
                        <code>audio</code> element.
                </audio> :
                null }
            </figure>
            </Box>)
        }
    }

    return(
    <Flex>        
        <Box border="1px solid black">
            <Heading>Minderva</Heading>
            <Button onClick={() => history.goBack()}>Exit Review</Button>
        </Box>
        
        <Flex border="1px black solid" p="10rem" justifyContent="space-around">
            <Box border="1px solid black" px="2rem" width="5rem">
                <h2>{cardNumber+1}/{quizCards.length}</h2>
            </Box>
                    {cardNumber+1 <= quizCards.length ?
                        <Box border="1px red solid">
                            
                            
                        
                        {/* CARD START */}
                        {/* When card is front, doesn't show next card */}
                            
                                            <header>{displayCard(cardSide)}</header>

                                     <Flex justifyContent="space-between">
                                        <Box d="flex" justifyContent="space-between" width="56%">
                                        <p>{cardSide}</p>
                                            <Button onClick={flipCard}>Flip Card</Button>
                                        </Box>
                                        <Flex justifyContent="flex-end">
                                            {!firstFlip ? 
                                                    <Button onClick={nextCard}>
                                                        Next Card
                                                    </Button> :
                                                        <span></span>
                                                    }
                                            
                                        </Flex>
                                    </Flex>
                            
                            {/* CARD END */}
                        </Box>
                        :
                        <div>
                            <p>Quiz Complete</p>
                            <button onClick={() => {
                            quizReset ? setQuizReset(false) : setQuizReset(true)
                            setCardNumber(0)}}>
                            Review Again</button>
                        </div>
                    }
            </Flex>
                    

    </Flex>
     
    )
}

export default Quiz;