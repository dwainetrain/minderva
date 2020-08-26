import React, { useEffect, useState } from 'react';
import PlayAudio from './PlayAudio'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Chakra UI
import {
    Button,
    Flex,
    Box,
    Heading,
    Text
} from '@chakra-ui/core'


const Quiz = ({ cardCollection }) => {

    const [quizCards, setQuizCards] = useState('');
    const [cardNumber, setCardNumber] = useState(0);
    const [cardSide, setCardSide] = useState('Card Front');
    const [firstFlip, setFirstFlip] = useState(true);
    const [quizReset, setQuizReset] = useState(true);

    // Using router history to handle exiting the quiz
    let history = useHistory();

    // Function to shuffle the cards
    const shuffleCards = (cards) => cards 
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

    // On loading the quiz, create a quiz object that shuffles the cards by an order number
    useEffect(() => {
        const quizData = () => {
            const cards = cardCollection.map((card, index) => { return {'order':index, ...card} })
            return shuffleCards(cards)
        }

        setQuizCards(quizData())

    }, [cardCollection, quizReset])

    const nextCard = () =>{
        setCardNumber(cardNumber + 1);
        setCardSide('Card Front')
        setFirstFlip(true)
    }

    const flipCard = () =>{
        cardSide === 'Card Front' ? setCardSide('Card Back') : setCardSide('Card Front')
        setFirstFlip(false)
    }

    // Card count display
    const CardCount = ({ cardNumber, totalCards }) => {
        if (cardNumber+1 > totalCards) {
            return <Text>End of Deck</Text>
        } else {
            return (
            <Text>
            {(cardNumber+1).toString(16).padStart(2, '0')}/{totalCards.toString(16).padStart(2, '0')}
            </Text>
            )
        }
    }

    // Parent style for card
    const QuizCard = ({ children, ...props }) => (
        <Box
        px="10rem" 
        py="8rem" 
        height="36rem"
        borderWidth="1px"
        rounded="lg"
        {...props}
        width="56rem"
        d="flex"
        flexDirection="column"
        justifyContent="space-between"
        //flex="0 1 calc(33% - 0.5em)"
        >
            {children}
        </Box>
    )

    // Parent style for card text
    const CardText = ({ children, ...props }) => (
        <Text
        fontFamily="Playfair Display"
        fontSize="4xl"
        lineHeight="shorter"
        {...props}
        >
            {children}
        </Text>
    )


    const DisplayCard = (side) => {
        
        if (cardSide === 'Card Front'){
            return (
            <QuizCard>
            <CardText>{quizCards[cardNumber].front}</CardText>
            <Text color="#999999">translate to {quizCards[cardNumber].targetLanguageName}</Text>
                {quizCards[cardNumber].frontAudioURL ? 
                <PlayAudio side='front-audio' source={quizCards[cardNumber].frontAudioURL} />
                :
                null }
                <Button onClick={flipCard}>Flip Card</Button>
            </QuizCard>)
        } else {
            return (
            <QuizCard>
            <CardText>{quizCards[cardNumber].back}</CardText>
                {quizCards[cardNumber].backAudioURL ?
                <PlayAudio side='back-audio' source={quizCards[cardNumber].backAudioURL} />
                :
                null }
                <Button onClick={flipCard}>Flip Card</Button>
            </QuizCard>)
        }
    }

    const CardControl = () => {
        return(
            <Flex justifyContent="space-between" height="5rem" alignItems="center">
                <Box d="flex" width="56%" pl="2rem">
                
                        <Button variant="link" onClick={() => history.goBack()}>Exit Review</Button>
                    
                </Box>
                <Flex justifyContent="flex-end" pr="2rem">
                    {firstFlip ? 
                        <span></span>
                        : (cardNumber+1 === quizCards.length) ? 
                        <Button onClick={nextCard}>
                            Complete
                        </Button> :
                        <Button onClick={nextCard}>
                            Next Card
                        </Button>       
                    }
                </Flex>
            </Flex>
        )
    }

    // This needs a serious amount of refactoring, but it does work
    const QuizState = () => {
        if(quizCards[cardNumber] !== undefined) {
                return(
                    <Flex px="10rem" py="5rem" justifyContent="space-around">
                    <Box px="2rem" width="12rem" textAlign="right">
                        <CardCount cardNumber={cardNumber} totalCards={quizCards.length} />
                        <Text>{cardSide}</Text>
                    </Box>
                    <Box>
                        {/* CARD START */}
                        {/* When card is front, doesn't show next card */}                            
                        <DisplayCard />
    
                        <CardControl />
                        {/* CARD END */}
                    </Box>
                    
                    </Flex>
                    
                )
        } else {
            if(quizCards.length !== 0 && cardNumber+1 > quizCards.length){
                return(
                    <Flex px="10rem" py="5rem" justifyContent="space-around">
                    <Box px="2rem" width="12rem" textAlign="right">
                        <CardCount cardNumber={cardNumber} totalCards={quizCards.length} />
                    </Box>
                    <Box>
                    <QuizCard>
                        <p>Quiz Complete! <span role="img" aria-label="Celebration Emoji">🎉</span></p>
                        <Button onClick={() => {
                        quizReset ? setQuizReset(false) : setQuizReset(true)
                        setCardNumber(0)}}>
                        Review Again</Button>
                        <Button variant="link" onClick={() => history.goBack()}>Exit Review</Button>
                    </QuizCard>
                    </Box>
                    </Flex>
                    )
            } else {
                return (
                    <Flex px="10rem" py="5rem" justifyContent="space-around">
                        <QuizCard>Loading Review</QuizCard>
                    </Flex>
                    )
                }
            }
    }

    return(
    <Flex flexWrap="wrap">
        <Helmet>
                <title>Minderva | Quiz</title>
        </Helmet>      
        <Box>
            <Heading fontFamily="Playfair Display" pl="10rem" py="4rem" color="tomato">Minderva</Heading>
        </Box>            
            <QuizState /> 
    </Flex>
     
    )
}

export default Quiz;