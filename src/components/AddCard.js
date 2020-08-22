import React, { useState, useEffect } from 'react';
import SelectLanguage from './SelectLanguage'
import { firestore, auth, functions } from '../firebase';
import { speechLanguageMap } from './speechLanguagesMap';
import PlayAudio from './PlayAudio'
import { useStateWithCallbackInstant } from 'use-state-with-callback';


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


const AddCard = ({ handleMessage, userLangPrefs }) => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [frontAudio, setFrontAudio] = useState('');
    const [backAudio, setBackAudio] = useState('');
    const [manualEntry, setManualEntry] = useState(false)
    const [reverseChecked, setReverseChecked] = useState(true)
    const [originLanguageName, setOriginLanguageName] = useState('')
    const [targetLanguageName, setTargetLanguageName] = useState('')

    // State Messages
    const [loadingTranslation, setLoadingTranslation] = useState(false)
    
    // This will eventually be a default set in user profile
    const [fromLanguage, setFromLanguage] = useState('');
    const [toLanguage, setToLanguage] = useState('');

    // Specific code for Google text-to-speech
    const [speechLanguage, setSpeechLanguage] = useState('')
    const [frontSpeechLanguage, setFrontSpeechLanguage] = useState('')

    // Audio States
    const [loadingAudio, setLoadingAudio] = useState('')

    // Set default preferences
    useEffect(() => {

        setToLanguage(!userLangPrefs.targetCode ? '' : userLangPrefs.targetCode)
        setFromLanguage(!userLangPrefs.originCode ? '' : userLangPrefs.originCode)
        setSpeechLanguage(!userLangPrefs.targetCode? '' : speechLanguageMap[userLangPrefs.targetCode].ttsCode)
        setFrontSpeechLanguage(!userLangPrefs.targetCode? '' : speechLanguageMap[userLangPrefs.originCode].ttsCode)
        setOriginLanguageName(!userLangPrefs.targetCode? '' : speechLanguageMap[userLangPrefs.originCode].language)
        setTargetLanguageName(!userLangPrefs.targetCode? '' : speechLanguageMap[userLangPrefs.targetCode].language)
    }, [userLangPrefs])

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
                    backAudioURL: backAudio,
                    frontAudioURL: frontAudio,
                    userID:auth.currentUser.uid,
                    origin: fromLanguage,
                    target: toLanguage,
                    backSpeechLanguage: speechLanguage,
                    frontSpeechLanguage: frontSpeechLanguage,
                    originLanguageName: originLanguageName,
                    targetLanguageName: targetLanguageName,
                    reverse: reverseChecked,
                    enabled: true,
                    dateCreated: new Date(),
                    lastReview: new Date(),
                    nextReview: ''
                }
                await firestore.collection(`users/${auth.currentUser.uid}/cards`).add(card);
                setFront('');
                setBack('');
                setFrontAudio('');
                setBackAudio('');
                setLoadingAudio('')
                handleMessage('saved');
            } catch(error) {
                console.error('Error Adding Card: ', error.message)
            }
            
        }
    }

    const handleFromLanguageSelect = async (e) => {
        const languageCode = await e.target.value
        setFromLanguage(languageCode)
        setOriginLanguageName(speechLanguageMap[languageCode].language)
        setFrontSpeechLanguage(speechLanguageMap[languageCode].ttsCode)
    }

    const handleToLanguageSelect = async (e) => {
        const languageCode = await e.target.value
        setToLanguage(languageCode)
        setTargetLanguageName(speechLanguageMap[languageCode].language)
        setSpeechLanguage(speechLanguageMap[languageCode].ttsCode)
    }

    const translationCall = functions.httpsCallable('translate');
    
    const translation = async (e) => {
        if (front === '') {
            handleMessage('frontRequired')
        } else if (front.length > 60) {
            handleMessage('characterLimit')
        } else {
        e.preventDefault();
            try{
                 translationCall({text:front,target:toLanguage}).then((result) => {
                    setFrontAudio('')
                    setBackAudio('')
                    setBack(result.data.translation)
                    setLoadingTranslation(false)
                    setGenerateAudio(true)
                    setLoadingAudio('loading')
                    
                })
            }
            catch(error) {
                    console.log(error)
            }
        }
    }

    const text2SpeechCall = functions.httpsCallable('gt2s');

    const textToSpeech = (side, text, speechLanguage) => {
            try{
                text2SpeechCall({text:text,target:speechLanguage}).then((result) => {
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

    // Ain't pretty, but it works
    const handleSwap = () => {
        const swapSpace = {
            oldFront:front,
            oldBack:back,
            oldFromLanguage:fromLanguage,
            oldToLanguage: toLanguage,
            oldSpeechLanguage: speechLanguage,
            oldFrontSpeechLanguage: frontSpeechLanguage,
            oldOriginLanguageName: originLanguageName,
            oldTargetLanguageName: targetLanguageName,
            oldFrontAudio: frontAudio,
            oldBackAudio: backAudio
        }

        setFront(swapSpace.oldBack);
        setBack(swapSpace.oldFront);
        setFromLanguage(swapSpace.oldToLanguage);
        setToLanguage(swapSpace.oldFromLanguage);
        setSpeechLanguage(swapSpace.oldFrontSpeechLanguage);
        setFrontSpeechLanguage(swapSpace.oldSpeechLanguage);
        setOriginLanguageName(swapSpace.oldTargetLanguageName);
        setTargetLanguageName(swapSpace.oldOriginLanguageName);
        setFrontAudio(swapSpace.oldBackAudio)
        setBackAudio(swapSpace.oldFrontAudio)
    }

     // Testing out callback in use state
     const [generateAudio, setGenerateAudio] = useStateWithCallbackInstant(false, () => {
     if(generateAudio === true) {
            textToSpeech('front', front, frontSpeechLanguage)
            textToSpeech('back', back, speechLanguage)
            setGenerateAudio(false)
        }
     })

    const handleManualGenerateAudio = () => {
        if (front === '') {
            handleMessage('frontRequired')
        } else if (back === '') {
            handleMessage('backRequired')
        } else {
            setFrontAudio('')
            setBackAudio('')
            setLoadingAudio('loading')
            setGenerateAudio(true)}
    }

    return (
        <Stack px={5} maxWidth="800px">
            <Heading as="h2">Add a Card</Heading>
            <Text>{JSON.stringify(userLangPrefs.targetCode)}</Text>
            
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
                        onChange={e => {
                            setFront(e.target.value)
                            }}
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
                            onChange={e => setBack(e.target.value)}
                            maxLength="60"
                            autoComplete="off"
                            size="lg"/>
                            
                            <Button variantColor="cyan" leftIcon="chevron-right" 
                            onClick={handleManualGenerateAudio}
                            >
                            Generate Audio
                            </Button>
                            <Button as="a"
                            onClick={() => setManualEntry(false)} >
                            Cancel
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

                    <Button variantColor="twitter" leftIcon="arrow-right" onClick={(e) => {
                        setManualEntry(false)
                        setLoadingAudio('')
                        translation(e)
                        setLoadingTranslation(true)}}>
                        Translate
                    </Button>

                    <Button size="sm" variant="link" leftIcon="edit" onClick={() => setManualEntry(true)}>
                        Manual Entry
                    </Button>
                    
                </Stack>
            </Flex>

            <Flex justifyContent="center">
                <Flex width="100%" justifyContent="space-around">
                <Button variantColor="blackAlpha" leftIcon="repeat" onClick={handleSwap}>
                            Swap Sides
                            </Button>
                </Flex>
                <Flex width="100%" justifyContent="flex-end">
                    <Checkbox mr={3} variantColor="teal" defaultIsChecked onChange={e =>  setReverseChecked(e.target.checked)}>
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