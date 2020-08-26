import React, { useState} from 'react'
import PlayAudio from './PlayAudio'
import SelectLanguage from './SelectLanguage'

// UI
import {
    Stack,
    Box,
    Text,
    Input,
    Button,
    Heading,
    Checkbox
} from '@chakra-ui/core'

const CardBack = ({
    toLanguage,
    handleToLanguageSelect,
    back,
    handleManualGenerateAudio,
    loadingTranslation,
    handleBack,
    front,
    loadingAudio,
    backAudio,
    handleTranslate,
    handleGenerateChecked,
    manual
}) => {
    const [manualEntry, setManualEntry] = useState(manual)

    return(
        <Stack
                flexBasis="100%"
                flex="1"
                padding={4}
                maxW="sm" 
                borderWidth="1px"
                rounded="lg"
                minWidth="lg"
                >
                    
                    <Box width="100%">
                        <Text textAlign="center" color="blackAlpha.500">
                        TARGET LANGUAGE
                        </Text>
                    </Box>
                     {!toLanguage ? <Text>Loading language</Text> :
                    <SelectLanguage 
                    handleLanguageSelect={handleToLanguageSelect}
                    selected={toLanguage} keyTo="target"/>}
                    
                    {manualEntry === true ? 
                        <div>
                            <Input
                            name="back" 
                            placeholder="Back" 
                            value={back}
                            onChange={handleBack}
                            maxLength="60"
                            autoComplete="off"
                            size="lg"/>
                            <Button as="a"
                            onClick={() => setManualEntry(false)} leftIcon="chevron-left">
                                Back to translation
                            </Button>
                            <Button variantColor="cyan" leftIcon="chevron-right" 
                            onClick={handleManualGenerateAudio}
                            >
                            Generate Audio
                            </Button>
                            
                        </div>
                        : loadingTranslation === true && front !== ''? 
                        <p>Loading translation</p> : 
                        <Heading as="h3">{back}</Heading>}

                    {loadingAudio === '' ? 
                        null 
                        : loadingAudio === 'loading' && backAudio === ''?
                            <p>Loading Audio</p>
                        :
                        <PlayAudio side='back-audio' source={backAudio} />
                        
                    }

                    {manualEntry === true ? null :
                    
                    <Stack>
                        <Button variantColor="twitter" variant="outline"
                        leftIcon="arrow-right" 
                        onClick={(e) => {
                            setManualEntry(false)
                            handleTranslate(e)
                            }}>
                        Translate
                        </Button>
                        <Checkbox mr={3} variantColor="teal" defaultIsChecked onChange={handleGenerateChecked}>
                            Generate Audio
                        </Checkbox>
                        <Button size="sm" variant="link" leftIcon="edit" onClick={() => setManualEntry(true)}>
                        Manual Entry
                        </Button>
                    </Stack>
                    
                    }
                </Stack>

    )
}

export default CardBack;