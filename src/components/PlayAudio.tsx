import React from 'react'
import { Button, Box, Text } from '@chakra-ui/react'
import { FiVolume2 } from "react-icons/fi";


/* Audio playback component */
const PlayAudio = ({ side, source, type = 'link' }: { side: string; source: string; type?: string }) => {

    const playSound = (side: string) => {
        const audioURL = document.getElementsByClassName(side)[0] as HTMLAudioElement;
        // audioURL.playbackRate = 0.5;
        audioURL.play()
    }

    return (
        <figure>
            <audio className={side}
                src={source} autoPlay={false} playsInline>
                Your browser does not support the
                <code>audio</code> element.
            </audio>

            {type === 'button' ?

                <Button variant="link" size="md" onClick={() => playSound(side)}>
                    <Box as={FiVolume2} size="24px" mr={3} />
                    <Text>Play Audio</Text>
                </Button>

                : <Button variant="link" size="md" onClick={() => playSound(side)}>
                    <Box as={FiVolume2} size="24px" mr={3} />

                </Button>

            }

        </figure>
    )
}

export default PlayAudio