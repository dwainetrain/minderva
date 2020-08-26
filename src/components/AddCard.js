import React, { useState, useEffect } from 'react';
import { firestore, auth, functions } from '../firebase';
import { speechLanguageMap } from './speechLanguagesMap';
import { useStateWithCallbackInstant } from 'use-state-with-callback';
import { Helmet } from 'react-helmet-async'
import CardFront from './CardFront'
import CardBack from './CardBack'
import { AiOutlineSwap } from "react-icons/ai";

// From Edit
import { collectIdsAndDocs } from '../utilities';
import { Link } from 'react-router-dom'


// Styling
import {
    Button,
    Flex,
    Stack,
    Heading,
    Box
  } from '@chakra-ui/core'


const AddCard = ({ handleMessage, userLangPrefs, mode, match, user, history, cardId }) => {

    const [currentMode, setCurrentMode] = useState('add')
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
    // const cardId = match.params.id;

    // If mode is 'add' then load user prefs, if mode is update then load card data
    useEffect(() => {
        setCurrentMode(mode)
        if (userLangPrefs !== '' && currentMode === 'add') {
            setToLanguage(userLangPrefs.targetCode)
            setFromLanguage(userLangPrefs.originCode)
            setSpeechLanguage(speechLanguageMap[userLangPrefs.targetCode].ttsCode)
            setFrontSpeechLanguage(speechLanguageMap[userLangPrefs.originCode].ttsCode)
            setOriginLanguageName(speechLanguageMap[userLangPrefs.originCode].language)
            setTargetLanguageName(speechLanguageMap[userLangPrefs.targetCode].language)
            
        } else if (userLangPrefs !== '' && currentMode === 'update'){
            const fetchData = async () => {
                const response = await firestore.doc(`users/${user.uid}/cards/${cardId}`).get();
                const cardDetail = collectIdsAndDocs(response);
                setFront(cardDetail.front);
                setBack(cardDetail.back);
                setFromLanguage(cardDetail.origin)
                setToLanguage(cardDetail.target)
                setOriginLanguageName(cardDetail.originLanguageName)
                setTargetLanguageName(cardDetail.targetLanguageName)
                setFrontSpeechLanguage(cardDetail.frontSpeechLanguage)
                setSpeechLanguage(cardDetail.backSpeechLanguage)
                setFrontAudio(cardDetail.frontAudioURL)
                setBackAudio(cardDetail.backAudioURL)
                setLoadingAudio(false)
              }
              fetchData()
        }
        
    }, [userLangPrefs, cardId, user.uid, currentMode, mode])

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
                handleMessage('saved', 'success');
            } catch(error) {
                console.error('Error Adding Card: ', error.message)
            }
            
        }
    }

    // Update
    const update = async (e) => {
        e.preventDefault();
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
        };
        const cardRef = firestore.doc(`users/${user.uid}/cards/${cardId}`);
        await cardRef.update(card);
        handleMessage('updated', 'success');
        // Redirects back to card collectioin using React Router history
        history.push('/card-collection')
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
            handleMessage('frontRequired', 'warning')
        } else if (front.length > 60) {
            handleMessage('characterLimit', 'warning')
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
            handleMessage('frontRequired', 'warning')
        } else if (back === '') {
            handleMessage('backRequired', 'warning')
        } else {
            setFrontAudio('')
            setBackAudio('')
            setLoadingAudio('loading')
            setGenerateAudio(true)}
    }

    return (
        <Stack pl="10rem" pt="2rem" maxWidth="800px">
            
            <Helmet>
                <title>Minderva | {mode === 'add' ? 'Add Cards' : 'Edit Card'}</title>
            </Helmet>

            <Heading as="h2" size="lg" pb="2rem">{mode === 'add' ? "Add a card" : 'Edit your card'}</Heading>
            
            <Flex flexWrap="wrap" justifyContent="space-between" >
                
                <CardFront 
                    toLanguage={toLanguage} 
                    loadingAudio={loadingAudio}
                    frontAudio={frontAudio}
                    handleFromLanguageSelect={handleFromLanguageSelect}
                    fromLanguage={fromLanguage}
                    front={front} 
                    handleFront={handleFront}/>
                    
                    <Button as={AiOutlineSwap} variant="link" variantColor="blackAlpha" onClick={handleSwap}>
                            Swap Sides
                    </Button>
                    
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
                    loadingTranslation={loadingTranslation}
                    manual={mode === 'update' ? true : false}/>

            
                
            </Flex>
            
            <Flex justifyContent="center">
                
                <Flex width="100%" justifyContent="flex-end">
                    {mode === 'add' ? 
                        <Button 
                            variantColor="whatsapp" 
                            leftIcon="add"
                            onClick={create}
                            placement="left"
                            // set it to false to force it to hide, or put it to undefined to 
                            // resume normal behaviour
                            label="This is disabled because..."
                            aria-label="This is disabled because..."
                        >
                        Add Card
                        </Button>
                         : 
                    <Box d="flex" justifyContent="space-between">
                        <Button as={Link} variant="LInk" to="/card-collection" mr={10} color="grayGreen.800">Cancel</Button>
                        <Button variantColor="whatsapp" onClick={update}>
                        Update Card
                        </Button>
                    </Box>}
                    
                </Flex>
            
            </Flex>
        </Stack>
        
    )}

export default AddCard;