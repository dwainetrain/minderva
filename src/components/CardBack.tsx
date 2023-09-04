import React, { useState } from 'react'
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
    Checkbox,
    Divider,
    Spinner
} from '@chakra-ui/react'
import { AiOutlineEdit, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

// Types
import { Card } from './@types/card';

/* 
Card Back used in Add/Edit Card screens
*/

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
    manual,
    fromLanguage
}: Card) => {
    const [manualEntry, setManualEntry] = useState(manual)

    return (
        <Stack
            flexBasis="100%"
            flex="1"
            padding={4}
            spacing={3}
            maxW="sm"
            borderWidth="1px"
            rounded="lg"
            minWidth="sm"
            maxWidth="md"
            minH="18rem"
        >

            <Box width="100%">
                <Text textAlign="center" color="blackAlpha.500">
                    TARGET LANGUAGE
                </Text>
            </Box>
            {!toLanguage ? <Text>Loading language</Text> :
                <SelectLanguage
                    handleLanguageSelect={handleToLanguageSelect}
                    selected={toLanguage} keyTo="target" />}

            {manualEntry === true ?
                <div>
                    <Input
                        name="back"
                        placeholder="Back"
                        value={back}
                        onChange={handleBack}
                        maxLength={60}
                        autoComplete="off"
                        size="lg" />
                </div>
                :
                <Heading as="h3" mt={3}>{back}</Heading>}

            {loadingAudio === '' ?
                null
                : loadingAudio === 'loading' && backAudio === '' ?
                    <Box>
                        <Spinner />
                        <p>Generating Audio</p>
                    </Box>
                    :
                    <Box ml={3} mt={1}>
                        <PlayAudio type="button" side='back-audio' source={backAudio} />
                    </Box>

            }

            <Divider my={6} />

            {manualEntry === true ?
                <Box display="flex" justifyContent="space-between">
                    <Button as="a" variant="link"
                        onClick={() => setManualEntry(false)} leftIcon={<AiOutlineLeft />}>
                        Translation
                    </Button>
                    <Button colorScheme="cyan" leftIcon={<AiOutlineRight />}
                        onClick={handleManualGenerateAudio}
                    >
                        Generate Audio
                    </Button>
                </Box>
                :

                <Stack>
                    <Button colorScheme="twitter" variant="outline"
                        isLoading={front !== '' && loadingTranslation}
                        leftIcon={<AiOutlineRight />}
                        onClick={(e) => {
                            setManualEntry(false)
                            if (handleTranslate) handleTranslate(e)
                        }}>
                        Translate
                    </Button>
                    <Checkbox mr={3} colorScheme="teal" defaultChecked onChange={handleGenerateChecked}>
                        Generate Audio
                    </Checkbox>
                    <Button size="sm" variant="link" leftIcon={<AiOutlineEdit />} onClick={() => setManualEntry(true)}>
                        Manual Entry
                    </Button>
                </Stack>

            }
        </Stack>

    )
}

export default CardBack;