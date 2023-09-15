import React, { useCallback, useEffect, useState } from 'react'
import { Button, Box, Text } from '@chakra-ui/react'
import { FiVolume2 } from "react-icons/fi";
import ReactAudioPlayer from 'react-audio-player';

/* Audio playback component */
const PlayAudio = ({ side, source, type = 'link' }: { side: string; source: string; type?: string }) => {

    // TODO: Original Function
    // const playAudio = (side: string) => {
    //     const audioURL = new Audio(source);
    //     audioURL.muted = false;
    //     console.log(audioURL.play())
    //     audioURL.play().then(response => console.log(`Did i play? ${response}`)).catch(error => {
    //         console.error('Playback failed:', error);
    //     });
    // }

    // TODO: The below setup works with a single card on the page. (see DisplayCards to set back to full array)
    // TODO: Try the Dummy Button idea that you have in the display cards, I think you'll have to move the logic here
    const [audioElement] = useState(new Audio(source));
    audioElement.autoplay = false;
    const [isPlaying, setIsPlaying] = useState(false);
    const toggle = useCallback(() => setIsPlaying(!isPlaying), [isPlaying]);

    useEffect(() => {
        isPlaying ? audioElement.play() : audioElement.pause();
    },
        [isPlaying, toggle, audioElement]
    );

    const onClick = () => {
        toggle();
    }


    return (
        <figure>
            <audio className={side}
                src={source} autoPlay={false} muted playsInline>
                Your browser does not support the
                <code>audio</code> element.
            </audio>

            {type === 'button' ?

                <Button variant="link" size="md" onClick={onClick}>
                    <Box as={FiVolume2} size="24px" mr={3} />
                    <Text>Play Audio</Text>
                </Button>

                : <Button variant="link" size="md" onClick={onClick}>
                    <Box as={FiVolume2} size="24px" mr={3} />

                </Button>

            }

        </figure>
    )
}

export default PlayAudio