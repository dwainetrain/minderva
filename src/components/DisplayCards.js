import React, { useEffect, useState } from 'react';
import DeleteCard from '../components/DeleteCard';
import { Link } from 'react-router-dom';
import "./DisplayCards.css"
import moment from 'moment'
import PlayAudio from './PlayAudio'
import NoCards from './NoCards'
import { Helmet } from 'react-helmet-async'

// Chakra UI
import { 
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Icon,
    Text,
    SimpleGrid,
    Box,
    Stack,
    Button } from '@chakra-ui/core'

const DisplayCards = ({ cardCollection, user, handleMessage })  =>{
  
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
            const searchFilter = () => {
                const frontResults = cardCollection.filter(card => card.front
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
        
                const backResults = cardCollection.filter(card => card.back
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
                
                const totalResults = [...frontResults, ...backResults]

                setSearchResults([...new Set(totalResults)])}

                if( cardCollection[0] !== 'loading'){
                    searchFilter()
                }

    }, [cardCollection, searchTerm])


    return(
        <>
        <Box px="10rem" py="3rem" width="100%">
            <Helmet>
                <title>Minderva | Card Collection</title>
            </Helmet>
            <Flex justifyContent="space-between" alignItems="flex-end">
                <InputGroup>
                    <InputLeftElement children={<Icon name="search" color="gray.300" />} />
                    <Input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search"/>
                    {searchTerm !== '' ? <Button onClick={() => setSearchTerm("")}>Clear</Button> : null}
                </InputGroup>
                <Text>Showing {searchResults.length} of {cardCollection.length} total cards</Text>
            </Flex>
        </Box>
        <SimpleGrid columns={[2, null, 3]} spacing="40px" px="10rem" pb="5rem">
                   {cardCollection.length === 0 ? <NoCards /> : null }
                    {cardCollection[0] === 'loading' ? null : searchResults
                    .sort((a, b) => b.dateCreated.seconds.valueOf() - a.dateCreated.seconds.valueOf())
                    .map(
                    card =>
                        <Stack 
                        key={card.id} 
                        spacing="1rem"
                        borderBottomWidth="1px"
                        borderWidth="1px"
                        rounded="lg"
                        p="4rem">
                            <Text>{card.front}</Text>
                            <PlayAudio side={"front-audio" + card.id} source={card.frontAudioURL}/>
                            <Text>{card.back}</Text>
                            <PlayAudio side={"back-audio" + card.id} source={card.backAudioURL}/>
                            <Text>{card.originLanguageName}/{card.targetLanguageName}</Text>
                            
                            <Flex justifyContent="space-between" py="1rem">
                                <Button as={Link} variant="ghost" to={`/edit-card/${card.id}`} user={user} id={card.id}>Edit</Button>
                            
                            <DeleteCard user={user} id={card.id} handleMessage={handleMessage} />

                            </Flex>
                            <Text fontSize="sm">Created: {moment.unix(card.dateCreated.seconds).calendar()}</Text>
                        </Stack>
                    )}

            
           
        </SimpleGrid>
        </>
  )}

export default DisplayCards;