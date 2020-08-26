import React, { useState, useEffect } from 'react';
import { firestore, auth, functions } from '../firebase';
import { speechLanguageMap } from './speechLanguagesMap';
import { useStateWithCallbackInstant } from 'use-state-with-callback';
import { Helmet } from 'react-helmet-async'
import CardFront from './CardFront'
import CardBack from './CardBack'

// From Edit
import { collectIdsAndDocs } from '../utilities';
import { Link } from 'react-router-dom'


// Styling
import {
    Button,
    Flex,
    Stack,
    Heading
  } from '@chakra-ui/core'


const AddCard = ({ handleMessage, userLangPrefs }) => {
    const [front, setFront] = useState(''); 
    const [back, setBack] = useState(''); 
    const [frontAudio, setFrontAudio] = useState(''); 
    const [backAudio, setBackAudio] = useState(''); 
    
    const [generateChecked, setGenerateChecked] = useState(true) 
    const [originLanguageName, setOriginLanguageName] = useState('') 
    const [targetLanguageName, setTargetLanguageName] = useState('') 

    // State Messages
    const [loadingTranslation, setLoadingTranslation] = useState(false)
    
    // Add card sets to user prefs
    const [fromLanguage, setFromLanguage] = useState('');
    const [toLanguage, setToLanguage] = useState('');

    // Specific code for Google text-to-speech
    const [speechLanguage, setSpeechLanguage] = useState('')
    const [frontSpeechLanguage, setFrontSpeechLanguage] = useState('')

    // Audio States
    const [loadingAudio, setLoadingAudio] = useState('')

    // From Edit
    // Bring in the id from router so we can preset the fields
    const cardId = match.params.id;


    // Set default preferences (ADD CARD)
    useEffect(() => {
        if (userLangPrefs !== '') {
            setToLanguage(userLangPrefs.targetCode)
            setFromLanguage(userLangPrefs.originCode)
            setSpeechLanguage(speechLanguageMap[userLangPrefs.targetCode].ttsCode)
            setFrontSpeechLanguage(speechLanguageMap[userLangPrefs.originCode].ttsCode)
            setOriginLanguageName(speechLanguageMap[userLangPrefs.originCode].language)
            setTargetLanguageName(speechLanguageMap[userLangPrefs.targetCode].language)
        }
        
    }, [userLangPrefs])

    // ADD CARD
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
                    reverse: false,
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

    const handleFront = (e) => {
        setFront(e.target.value)
    }

    const handleBack = (e) => {
        setBack(e.target.value)
    }

    const handleTranslate = (e) => {
        setLoadingAudio('')
        translation(e)
        setLoadingTranslation(true)
    }

    const handleGenerateChecked = (e) => {
        setGenerateChecked(e.target.checked)
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
                    if(generateChecked){
                        setGenerateAudio(true)
                        setLoadingAudio('loading')
                    }
                    
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
    // Should I move this to utilities?
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

     // Call generate audio when set to true by translation
     const [generateAudio, setGenerateAudio] = useStateWithCallbackInstant(false, () => {
     if(generateAudio === true && generateChecked) {
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
        <Stack pl="10rem" pt="2rem" maxWidth="800px">
            
            <Helmet>
                <title>Minderva | Add Cards</title>
            </Helmet>

            <Heading as="h2" size="lg" pb="2rem">Add a Card</Heading>
            
            <Flex direction="row" flexWrap="wrap" justifyContent="space-between" >
                
                <CardFront 
                    toLanguage={toLanguage} 
                    loadingAudio={loadingAudio}
                    frontAudio={frontAudio}
                    handleFromLanguageSelect={handleFromLanguageSelect}
                    fromLanguage={fromLanguage}
                    front={front} 
                    handleFront={handleFront}/>

                <CardBack 
                    fromLanguage={fromLanguage} 
                    loadingAudio={loadingAudio}
                    backAudio={backAudio}
                    handleToLanguageSelect={handleToLanguageSelect}
                    toLanguage={toLanguage}
                    back={back} 
                    handleBack={handleBack}
                    front={front}
                    handleTranslate={handleTranslate}
                    handleGenerateChecked={handleGenerateChecked}
                    handleManualGenerateAudio={handleManualGenerateAudio}
                    loadingTranslation={loadingTranslation}/>
                
            </Flex>

            <Flex justifyContent="center">
                <Flex width="100%" justifyContent="space-around">
                <Button variantColor="blackAlpha" leftIcon="repeat" onClick={handleSwap}>
                            Swap Sides
                            </Button>
                </Flex>
                <Flex width="100%" justifyContent="flex-end">
                    
                    <Button variantColor="whatsapp" leftIcon="add" onClick={create}>
                    Add Card
                    </Button>
                </Flex>
            </Flex>
        </Stack>
        
    )}

export default AddCard;