import React, { useState } from 'react'
import "./Quote.css"

const Quote = () => {
    
    const [word, setWord] = useState('奇妙さ')
    const wordReveal = {
        originalWord: '奇妙さ',
        revealWord:'strangeness'
    }

    return(
        <div className="quote--container">
        <span className="quote">
            There is no exquisite beauty without some
            <span className="quote--highlight" 
            onMouseEnter={() => setWord(wordReveal.revealWord)} 
            onMouseLeave={() => setWord(wordReveal.originalWord)}>
                 &nbsp;{word}
        </span> in the proportion.
        </span>
        <span className="quote--author">&ndash; Francis Bacon</span>
        </div>
    )
}

export default Quote;