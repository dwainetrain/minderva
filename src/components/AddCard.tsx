import React, { useState, useEffect } from 'react';
import { firestore, auth, functions } from '../firebase';
import { speechLanguageMap, SpeechLanguageMap } from './constants/speechLanguagesMap';
import { useStateWithCallbackInstant } from 'use-state-with-callback';
import { Helmet } from 'react-helmet-async'
import CardFront from './CardFront'
import CardBack from './CardBack'
import { AiOutlinePlus, AiOutlineSwap } from "react-icons/ai";

// From Edit
import { collectIdsAndDocs } from '../utilities';
import { Link, useNavigate } from 'react-router-dom'

// Styling
import {
    Button,
    Flex,
    Stack,
    Heading,
    Box,
    IconButton,
    Tooltip
} from '@chakra-ui/react'

// Types
import { CardAction } from './@types/card'

/* 
Complex component that handles both adding and editing cards
Along with translation and text-to-speech api calls
TODO: Best candidate for more refactoring. Could I use some kind of state management to reduce complexity?

The incoming mode prop is used to decide if the component adds or updates

*/

// TODO: Move these type definitions to types folder...

const AddCard = ({ handleMessage, userLangPrefs, mode, user, cardId }: CardAction) => {
    const navigate = useNavigate();

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
    const [speechLanguage, setSpeechLanguage] = useState<SpeechLanguageMap | string>('')
    const [frontSpeechLanguage, setFrontSpeechLanguage] = useState<SpeechLanguageMap | string>('')

    // Audio States
    const [loadingAudio, setLoadingAudio] = useState('')

    // If mode is 'add' then load user prefs, if mode is update then load card data
    useEffect(() => {
        setCurrentMode(mode)
        if (userLangPrefs && currentMode === 'add') {
            setToLanguage(userLangPrefs.targetCode)
            setFromLanguage(userLangPrefs.originCode)
            setSpeechLanguage(speechLanguageMap[userLangPrefs.targetCode].ttsCode)
            setFrontSpeechLanguage(speechLanguageMap[userLangPrefs.originCode].ttsCode)
            setOriginLanguageName(speechLanguageMap[userLangPrefs.originCode].language)
            setTargetLanguageName(speechLanguageMap[userLangPrefs.targetCode].language)

        } else if (userLangPrefs && currentMode === 'update') {
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
                setLoadingAudio('')
            }
            fetchData()
        }

    }, [userLangPrefs, cardId, user.uid, currentMode, mode])

    // ADD CARD
    const create = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (front === '') {
            handleMessage('frontRequired')
        } else if (back === '') {
            handleMessage('backRequired')
        } else {
            try {
                const card = {
                    front: front,
                    back: back,
                    backAudioURL: backAudio,
                    frontAudioURL: frontAudio,
                    userID: auth.currentUser!.uid,
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
                await firestore.collection(`users/${auth.currentUser!.uid}/cards`).add(card);
                setFront('');
                setBack('');
                setFrontAudio('');
                setBackAudio('');
                setLoadingAudio('')
                handleMessage('saved', 'success');
            } catch (error) {
                console.error('Error Adding Card: ', error.message)
            }

        }
    }

    // Update
    const update = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const card = {
            front: front,
            back: back,
            backAudioURL: backAudio,
            frontAudioURL: frontAudio,
            userID: auth.currentUser!.uid,
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
        // Redirects back to card collection using React Router history
        navigate('/card-collection');
    }

    const handleFromLanguageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const languageCode = e.target.value
        setFromLanguage(languageCode)
        setOriginLanguageName(speechLanguageMap[languageCode].language)
        setFrontSpeechLanguage(speechLanguageMap[languageCode].ttsCode)
    }

    const handleToLanguageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const languageCode = e.target.value
        setToLanguage(languageCode)
        setTargetLanguageName(speechLanguageMap[languageCode].language)
        setSpeechLanguage(speechLanguageMap[languageCode].ttsCode)
    }

    const handleFront = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFront(e.target.value)
    }

    const handleBack = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBack(e.target.value)
    }

    const handleTranslate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLoadingAudio('')
        translation(e)
        setLoadingTranslation(true)
    }

    const handleGenerateChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGenerateChecked(e.target.checked)
    }

    const translationCall = functions.httpsCallable('translate');

    const translation = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (front === '') {
            handleMessage('frontRequired', 'warning')
        } else if (front.length > 60) {
            handleMessage('characterLimit', 'warning')
        } else {
            e.preventDefault();
            try {
                translationCall({ text: front, target: toLanguage }).then((result) => {
                    setFrontAudio('')
                    setBackAudio('')
                    setBack(result.data.translation)
                    setLoadingTranslation(false)
                    if (generateChecked) {
                        setGenerateAudio(true)
                        setLoadingAudio('loading')
                    }

                })
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const text2SpeechCall = functions.httpsCallable('gt2s');

    const textToSpeech = (side: string, text: string, speechLanguage: SpeechLanguageMap) => {
        try {
            text2SpeechCall({ text: text, target: speechLanguage }).then((result) => {
                if (side === 'back') {
                    setBackAudio(result.data)
                } else if (side === 'front') {
                    setFrontAudio(result.data)
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    // Ain't pretty, but it works
    // Should I move this to utilities?
    const handleSwap = () => {
        const swapSpace = {
            oldFront: front,
            oldBack: back,
            oldFromLanguage: fromLanguage,
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
        if (generateAudio === true && generateChecked) {
            textToSpeech('front', front, frontSpeechLanguage as SpeechLanguageMap)
            textToSpeech('back', back, speechLanguage as SpeechLanguageMap)
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
            setGenerateAudio(true)
        }
    }

    return (
        <Stack px={{ sm: 10, md: 24 }} pt="1rem" maxWidth="1200px">

            <Helmet>
                <title>Minderva | {mode === 'add' ? 'Add Cards' : 'Edit Card'}</title>
            </Helmet>

            <Heading as="h2" size="md" pb={3}>{mode === 'add' ? "Add a card" : 'Edit your card'}</Heading>


            <Flex justifyContent="space-between" flexDirection={{ sm: "column", md: "row" }} alignItems={{ sm: "center", md: "flex-start" }}>

                <CardFront
                    toLanguage={toLanguage}
                    loadingAudio={loadingAudio}
                    frontAudio={frontAudio}
                    handleFromLanguageSelect={handleFromLanguageSelect}
                    fromLanguage={fromLanguage}
                    front={front}
                    handleFront={handleFront} />

                <Tooltip aria-label="Swap Sides" label="Swap Sides" placement="top" bg="grayGreen.200" color="grayGreen.800">
                    <IconButton
                        alignSelf="center"
                        variant="link"
                        colorScheme="blackAlpha"
                        aria-label="Swap Card Sides"
                        fontSize="36px"
                        size="md"

                        icon={<AiOutlineSwap />}
                        onClick={handleSwap}
                        maxH={16}
                    />
                </Tooltip>

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
                    manual={mode === 'update' ? true : false}
                />
            </Flex>

            <Flex justifyContent="center">
                <Flex width="100%" justifyContent={{ sm: "center", md: "flex-end" }} mb={5}>
                    {mode === 'add' ?
                        <Button
                            colorScheme="whatsapp"
                            leftIcon={<AiOutlinePlus />}
                            onClick={create}
                            // placement="left" // Removed because of TS error, not sure it's 
                            // needed...
                            // set it to false to force it to hide, or put it to undefined to 
                            // resume normal behavior
                            // label="This is disabled because..." // Causing TS error
                            // TODO: Button should be inactive if the user hasn't filled out 
                            // the front and back of card...
                            aria-label="Add Card"
                        >
                            Add Card
                        </Button>
                        :
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Link to="/card-collection" >
                                <Button as="a" variant="link" mr={10} color="grayGreen.800">Cancel</Button>
                            </Link>
                            <Button colorScheme="whatsapp" onClick={update}>
                                Update Card
                            </Button>
                        </Box>}
                </Flex>

            </Flex>
        </Stack>

    )
}

export default AddCard;