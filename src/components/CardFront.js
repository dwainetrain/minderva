import React from 'react'
import PlayAudio from './PlayAudio'
import SelectLanguage from './SelectLanguage'

// UI
import {
    Stack,
    Box,
    Text,
    Input
} from '@chakra-ui/core'

const CardFront = ({ toLanguage, 
            handleFromLanguageSelect, 
            fromLanguage, 
            front, 
            handleFront, 
            loadingAudio, 
            frontAudio }) => {
    return(
        <Stack
                flexBasis="100%"
                flex="1"
                padding={4}
                spacing={3}
                minWidth="lg"
                maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">

                    <Box>
                        <Text textAlign="center" color="blackAlpha.500" >
                        ORIGIN LANGUAGE
                        </Text>
                    </Box>
                    
                    {!toLanguage ? <Text>Loading language</Text> : <SelectLanguage 
                    handleLanguageSelect={handleFromLanguageSelect}
                    selected={fromLanguage} keyTo="text"/>}

                    <Input
                        name="front" 
                        placeholder="Front" 
                        value={front}
                        onChange={handleFront}
                        maxLength="60"
                        autoComplete="off"
                        size="lg"
                        />

                    {loadingAudio === '' ? 
                        null 
                        : loadingAudio === 'loading' && frontAudio === '' ?
                            <p>Loading Audio</p>
                        :
                        <PlayAudio side='front-audio' source={frontAudio} />
                    }
                            
                </Stack>
    )
}

export default CardFront;