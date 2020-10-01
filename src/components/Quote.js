import React, { useState, useEffect } from 'react'
import "./Quote.css"
import {quotes} from './quotes'

/* Logic and display of Quote.
    Extracts a single word from a quote and replaces it with another word 
    then toggles between the words on hover
*/

const Quote = () => {
    
    const [originalWord, setOriginalWord] = useState('')
    const [revealWord, setRevealWord] = useState('')
    const [newQuote, setNewQuote] = useState('')
    const [author, setAuthor] = useState('')
    const [firstHalf, setFirstHalf] = useState('')
    const [lastHalf, setLastHalf] = useState('')
    const [wordTransistion, setWordTransition] = useState('')

    useEffect(()=>{
        // Pulls random quote, and replaces selected word with translated word
        // Just works on a single word for now
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setNewQuote(randomQuote.quote)
        setOriginalWord(randomQuote.originalWord)
        setWordTransition(randomQuote.revealWord)
        setRevealWord(randomQuote.revealWord)
        setAuthor(randomQuote.author)
        const splitQuote = newQuote.split(' ')
        const wordLocation = splitQuote.findIndex(word => word === randomQuote.originalWord)
        setFirstHalf(splitQuote.slice(0, wordLocation).join(' '))
        setLastHalf(splitQuote.slice(wordLocation+1).join(' '))

    }, [newQuote])


    return(
        <div className="quote--container">
            <span className="quote">
                {firstHalf}
                <span className="quote--highlight" 
                onMouseEnter={() => setWordTransition(originalWord)} 
                onMouseLeave={() => setWordTransition(revealWord)}>
                    &nbsp;{wordTransistion}&nbsp;
                </span>
                {lastHalf}
            </span>
            <span className="quote--author">&ndash; {author}</span>
        </div>
    )
}

export default Quote;