import React, { useState } from 'react';
import SelectLanguage from './SelectLanguage'
import { firestore, auth, functions } from '../firebase';
import { Grid, Card, Button, Input, Form } from 'semantic-ui-react'
import { speechLanguages } from './speechLanguagesMap';

const AddCard = ({ handleMessage }) => {

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [audio, setAudio] = useState('');

    // For automatically updating translation audio when a new phrase is translated
    const [generateAudio, setGenerateAudio] = useState(false)
    
    // This will eventually be a default set in user profile
    const [fromLanguage, setFromLanguage] = useState('en');
    const [toLanguage, setToLanguage] = useState('ja');

    // Specific code for Google text-to-speech
    const [speechLanguage, setSpeechLanguage] = useState('ja-JP')

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

    const handleFromLanguageSelect = (e) => {
        setFromLanguage(e.target.value)
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
                    setGenerateAudio(true)
                })
            }
            catch(error) {
                    console.log(error)
            }
        }
    }

    const text2SpeechCall = functions.httpsCallable('gt2s');

    const textToSpeech = (e) => {
        // if set to true, audio will be generated
        if(generateAudio === true) {
            try{
                text2SpeechCall({text:back,target:speechLanguage}).then((result) => {
                    setAudio(result.data)
                    setGenerateAudio(false)
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
        <div>
            <p>Add a Card</p>

            {/*  */}
            <Form onSubmit={create}>
            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column width="12">
                        <Card.Group>
                        <Card fluid>
                            <Card.Content>
                                <Input
                                fluid
                                transparent
                                size='massive'
                                name="front" 
                                placeholder="Front" 
                                value={front}
                                onChange={e => setFront(e.target.value)}
                                maxLength="60"
                                autoComplete="off"/>
                            </Card.Content>
                        </Card>
                        <Card fluid>
                            <Card.Content>
                                <span>Translate From: <SelectLanguage 
                                handleLanguageSelect={handleFromLanguageSelect}
                                selected={fromLanguage} keyTo="text"/></span>{' '}
                                
                                <span>Translate To: <SelectLanguage 
                                handleLanguageSelect={handleToLanguageSelect}
                                selected={toLanguage} keyTo="target"/></span>

                                <h3>{back}</h3>
                                <Button type='button' onClick={translation} as='a'>Translate</Button>
                                <Button type='button' onClick={textToSpeech} as='a'>Generate Audio</Button>
                            </Card.Content>
                            <Card.Content extra>
                                <input
                                    type="text"
                                    name="back"
                                    placeholder="back"
                                    value={back}
                                    onChange={e => setBack(e.target.value)}
                                >
                                </input>
                            </Card.Content>
                        </Card>
                        </Card.Group>
                    </Grid.Column>
                    
                    <Grid.Column>
                            <Button>Add Card</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
            </Form>

            <figure>
                <figcaption>Listen to the Somthing:</figcaption>
                <audio
                    controls
                    src={audio}>
                        Your browser does not support the
                        <code>audio</code> element.
                </audio>
            </figure>
            {/*  */}

            
        </div>
    )}

export default AddCard;