import React, { useState } from 'react';
import SelectLanguage from './SelectLanguage'
import { firestore, auth, functions } from '../firebase';
import { Grid, Card, Button, Input, Form } from 'semantic-ui-react'

const AddCard = ({ handleMessage }) => {

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [audio, setAudio] = useState('');
    
    //This will eventually be a default set in user profile
    const [fromLanguage, setFromLanguage] = useState('en');
    const [toLanguage, setToLanguage] = useState('ja');

    // TODO: Map this between the google translate languages and tts languages
    // Basic idea, when the toLanguage state changes, look up the corresponding
    // value in the speechLanguages and set that to the setSpeechLanguage, if undefined, don't show
    // generate audio button. For languages that are there, setSpeechLanguage to matching value
    // Set gender and name to neutral right now, customizing those will be a future concern
    
    //////////// So, the new plan, since this is all static anyway, is just build the document to begin with
    // It should have long Languages name, translate code and if available, voice code,
    // If it does have voice, it will say so in the drop down menu
    // There will be no option to generate audio on entries that don't have it
    // Somehow also map out the voice names, at least one high quality male and one high quality female
    // and the option for neutral, though I don't know the effect of wavenet on that

    /////////////// You should just have a helper file that you can build out anytime you need to update languages
    // 
    const [speechLanguage, setSpeechLanguage] = useState('ja-JP')

    const create = async (e) => {
        e.preventDefault();
        if (front === '') {
            handleMessage('frontRequired')
        } else if (back === ''){
            handleMessage('backRequired')
        } else {
            try {
                const card = {front:front, back:back, userID:auth.currentUser.uid}
                await firestore.collection(`users/${auth.currentUser.uid}/cards`).add(card);
                setFront('');
                setBack('');
                handleMessage('saved');
            } catch(error) {
                console.error('Error Adding Card: ', error.message)
            }
            
        }
    }

    const handleFromLanguageSelect = (e) => {
        setFromLanguage(e.target.value)
    }

    const handleToLanguageSelect = (e) => {
        setToLanguage(e.target.value)
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
                await translationCall({text:front,target:toLanguage}).then((result) => {
                    setBack(result.data.translation)
                })
            }
            catch(error) {
                    console.log(error)
            }
        }
    }

    const text2SpeechCall = functions.httpsCallable('gt2s');

    const textToSpeech = (e) => {
        try{
            text2SpeechCall({text:back,target:speechLanguage}).then((result) => {
                setAudio(result.data)
            })
        }
        catch(error) {
                console.log(error)
        }
    }

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