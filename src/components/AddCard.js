import React, { useState } from 'react';
import SelectLanguage from './SelectLanguage'
import { firestore, auth, functions } from '../firebase';
import { speechLanguages } from './speechLanguagesMap';

// Styling
import {
    Box,
    Text,
    Input,
    Button,
    Flex,
    Checkbox,
    Stack,
    Heading
  } from '@chakra-ui/core'


  /// OK, something is fishy. Why does it send back japanese pronunciation of German, time to walk through the process and figure out! I'm making two different calls to the function, so the data shouldn't be mixing up, so somewhere, somehow, the front language declaration is getting mixed with the back.
  // Refactoring might help.

const AddCard = ({ handleMessage }) => {

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [audio, setAudio] = useState('');
    const [frontAudio, setFrontAudio] = useState('');
    const [backAudio, setBackAudio] = useState('');

    // For automatically updating translation audio when a new phrase is translated
    const [generateAudio, setGenerateAudio] = useState(true)
    
    // This will eventually be a default set in user profile
    const [fromLanguage, setFromLanguage] = useState('en');
    const [toLanguage, setToLanguage] = useState('ja');

    // Specific code for Google text-to-speech
    const [speechLanguage, setSpeechLanguage] = useState('ja-JP')
    const [frontSpeechLanguage, setFrontSpeechLanguage] = useState('en-GB')

    const create = async (e) => {
        e.preventDefault();
        if (front === '') {
            handleMessage('frontRequired')
        } else if (back === ''){
            handleMessage('backRequired')
        } else {
            try {
                const card = {
                    front:front, 
                    back:back, 
                    audioURL:audio, 
                    userID:auth.currentUser.uid,
                    origin: fromLanguage,
                    target: toLanguage,
                    reverse: false,
                    enabled: true,
                    dateCreated: new Date(),
                    lastReview: new Date(),
                    nextReview: ''
                }
                await firestore.collection(`users/${auth.currentUser.uid}/cards`).add(card);
                setFront('');
                setBack('');
                setAudio('');
                handleMessage('saved');
            } catch(error) {
                console.error('Error Adding Card: ', error.message)
            }
            
        }
    }

    const handleFromLanguageSelect = async (e) => {
        const languageCode = await e.target.value
        setFromLanguage(languageCode)
        setFrontSpeechLanguage(speechLanguages[languageCode])
    }

    const handleToLanguageSelect = async (e) => {
        const languageCode = await e.target.value
        setToLanguage(languageCode)
        setSpeechLanguage(speechLanguages[languageCode])
    }

    const translationCall = functions.httpsCallable('translate');
    
    const translation = (e) => {
        if (front === '') {
            handleMessage('frontRequired')
        } else if (front.length > 60) {
            handleMessage('characterLimit')
        } else {
        e.preventDefault();
            try{
                 translationCall({text:front,target:toLanguage}).then((result) => {
                    setBack(result.data.translation)
                })
            }
            catch(error) {
                    console.log(error)
            }
        }
    }

    const text2SpeechCall = functions.httpsCallable('gt2s');

    const textToSpeech = (side, text, speechLanguage) => {
        // if set to true, audio will be generated
        if(generateAudio === true) {
            try{
                text2SpeechCall({text:text,target:speechLanguage}).then((result) => {
                    console.log(speechLanguage)
                    if(side === 'back') { 
                    setBackAudio(result.data) } else if (side === 'front') { 
                    setFrontAudio(result.data)
                    }
                })
            }
            catch(error) {
                    console.log(error)
            }
        }
    }

    // // only generate audio when set to true by translation results
    // // This needs some work, because it's accomplishing the goal but spitting out a warning
    // useEffect(() => {
    //     textToSpeech();
    //   }, [generateAudio]);

    return (
        <Stack px={5} maxWidth="800px">
            <Heading as="h2">Add a Card</Heading>
            
            <Flex direction="row" flexWrap="wrap" justifyContent="space-around" >
                <Stack
                flexBasis="100%"
                flex="1"
                padding={4}
                spacing={3}
                minWidth="lg"
                maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">

                    <Box>
                        <Text textAlign="center" color="blackAlpha.500" >
                        FRONT
                        </Text>
                    </Box>
                    
                    <SelectLanguage 
                    handleLanguageSelect={handleFromLanguageSelect}
                    selected={fromLanguage} keyTo="text"/>

                    <Input
                        name="front" 
                        placeholder="Front" 
                        value={front}
                        onChange={e => setFront(e.target.value)}
                        maxLength="60"
                        autoComplete="off"
                        size="lg"/>

                    <audio
                        controls
                        src={frontAudio}>
                            Your browser does not support the
                            <code>audio</code> element.
                    </audio>
                </Stack>

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
                        BACK
                        </Text>
                    </Box>

                    <SelectLanguage 
                    handleLanguageSelect={handleToLanguageSelect}
                    selected={toLanguage} keyTo="target"/>
                    
                    <Heading as="h3">{back}</Heading>

                    <figure>
                        <audio
                            controls
                            src={backAudio}>
                                Your browser does not support the
                                <code>audio</code> element.
                        </audio>
                    </figure>

                    <Button variantColor="twitter" leftIcon="arrow-right" onClick={translation}>
                        Translate
                    </Button>

                    <Button size="sm" variant="link" leftIcon="edit">
                        Manual Entry
                    </Button>
                    
                </Stack>
            </Flex>

            <Flex justifyContent="center">
                <Flex width="100%" justifyContent="space-around">
                    <Button variantColor="blackAlpha" leftIcon="repeat">
                    Swap Sides
                    </Button>
                    <Button variantColor="cyan" leftIcon="chevron-right" onClick={() => {textToSpeech('back', back, speechLanguage)
                    textToSpeech('front', front, frontSpeechLanguage)}
                    }>
                    Generate Audio
                    </Button>
                </Flex>
                <Flex width="100%" justifyContent="flex-end">
                    <Checkbox isReadOnly mr={3} variantColor="teal" isChecked>
                    Study Reverse
                    </Checkbox>
                    <Button variantColor="whatsapp" leftIcon="add" onClick={create}>
                    Add Card
                    </Button>
                </Flex>
            </Flex>
        </Stack>
        
    )}

export default AddCard;