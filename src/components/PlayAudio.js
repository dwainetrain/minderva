import React from 'react'

const PlayAudio = ({ side, source }) => {
        
    const playAudio = (side) => {
        const audioURL = document.getElementsByClassName(side)[0]
        // audioURL.playbackRate = 0.5;
        audioURL.play()
      }
    
    return (
        <figure>
            <audio className={side}
                src={source}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
            <button onClick={() => playAudio(side)}>
                <span>Play Audio</span>
            </button>
        </figure>
      )
}

export default PlayAudio