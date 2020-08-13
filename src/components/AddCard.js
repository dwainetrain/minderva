import React, { useState } from 'react';
import SelectLanguage from './SelectLanguage'
import { firestore, auth, functions } from '../firebase';
import { Grid, Card, Button, Input, Form } from 'semantic-ui-react'

const AddCard = ({ handleMessage }) => {

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    
    //This will eventually be a default set in user profile
    const [fromLanguage, setFromLanguage] = useState('en');
    const [toLanguage, setToLanguage] = useState('es');

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
            {/*  */}

            
        </div>
    )}

export default AddCard;