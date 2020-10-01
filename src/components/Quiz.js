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
    Text,
    Spinner
} from '@chakra-ui/core'

/* Logic and layout for card Quiz, a little bloated at the moment */

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
            {(cardNumber+1).toString().padStart(2, '0')}/{totalCards.toString().padStart(2, '0')}
            </Text>
            )
        }
    }

    // Parent style for card
    const QuizCard = ({ children, ...props }) => (
        <Box
        px={20} 
        py={20}
        height="24rem"
        borderWidth="1px"
        rounded="lg"
        {...props}
        width={{sm:"100%", md:"35rem"}}
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
        fontFamily="span"
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
                <Button size="sm" onClick={flipCard}>Flip Card</Button>
            </QuizCard>)
        } else {
            return (
            <QuizCard>
            <CardText>{quizCards[cardNumber].back}</CardText>
                {quizCards[cardNumber].backAudioURL ?
                <PlayAudio side='back-audio' source={quizCards[cardNumber].backAudioURL} />
                :
                null }
                <Button size="sm" onClick={flipCard}>Flip Card</Button>
            </QuizCard>)
        }
    }

    const CardControl = () => {
        return(
            <Flex justifyContent="space-between" height="5rem" alignItems="center">
                <Box d="flex" width="56%" pl="2rem">
                
                        <Button size="sm" variant="link" onClick={() => history.goBack()}>Exit Review</Button>
                    
                </Box>
                <Flex justifyContent="flex-end" pr="2rem">
                    {firstFlip ? 
                        <span></span>
                        : (cardNumber+1 === quizCards.length) ? 
                        <Button size="sm" onClick={nextCard}>
                            Complete
                        </Button> :
                        <Button size="sm" onClick={nextCard}>
                            Next Card
                        </Button>       
                    }
                </Flex>
            </Flex>
        )
    }

    // It does work, but this needs a serious amount of refactoring, 
    const QuizState = () => {
        
        if(quizCards[cardNumber] !== undefined) {
                return(
                    <Flex px={{sm:10, md:16}} py="3rem" justifyContent="flex-start" flexDirection={{sm:'column-reverse', md:'row'}}>
                    <Box pr="2rem" width="8rem" textAlign={{sm:"left", md:"right"}}>
                        <CardCount cardNumber={cardNumber} totalCards={quizCards.length} />
                        <Text>{cardSide}</Text>
                    </Box>
                    <Box>                          
                        <DisplayCard />
                        <CardControl />
                    </Box>
                    
                    </Flex>
                    
                )
        } else {
            if(quizCards.length !== 0 && cardNumber+1 > quizCards.length){
                return(
                    <Flex px={{sm:10, md:16}} py="3rem" justifyContent="flex-start" flexDirection={{sm:'column-reverse', md:'row'}}>
                    <Box pr="2rem" width="8rem" textAlign={{sm:"left", md:"right"}}>
                        <CardCount cardNumber={cardNumber} totalCards={quizCards.length} />
                    </Box>
                    <Box>
                    <QuizCard>
                        <Text textAlign="center" fontSize="2xl">Review Complete <span role="img" aria-label="Celebration Emoji">🎉</span></Text>
                        <Button size="sm" onClick={() => {
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
                    <Flex px={{sm:10, md:16}} py="3rem" justifyContent="flex-start" alignItems="flex-start" flexDirection={{sm:'column-reverse', md:'column'}}>
                        <QuizCard>
                            <Flex justifyContent="Center" alignItems="Center" mx={{sm:10, md:40}}>
                            <Box>
                                <Spinner color="tomato" />
                            </Box>
                            </Flex>
                            <Text>Loading Review</Text>
                            </QuizCard>
                        <Button mt={4} variant="link" onClick={() => history.goBack()}>Exit Review</Button>
                    </Flex>
                    )
                }
            }
    }

    return(
    <Flex flexWrap="wrap" flexDirection={{sm:'column-reverse', md:'row'}} >
        <Helmet>
                <title>Minderva | Quiz</title>
        </Helmet>      
        <Box>
            <Heading as="h1" fontSize="2xl" fontFamily="span" pl={{sm:10, md:16}} py="3rem" color="tomato">Minderva</Heading>
        </Box>            
            <QuizState />
    </Flex>
     
    )
}

export default Quiz;