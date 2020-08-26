import React, { useEffect, useState } from 'react';
import DeleteCard from '../components/DeleteCard';
import { Link } from 'react-router-dom';
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
    Button,
    Spinner,
    Divider } from '@chakra-ui/core'

const DisplayCards = ({ cardCollection, user, handleMessage, cardsLoaded })  =>{
  
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
        {cardsLoaded ? 
        
            <SimpleGrid columns={[2, null, 3]} spacing="40px" px="10rem" pb="5rem" minChildWidth="36rem">
                   {cardCollection.length === 0 ? <NoCards /> : null }
                    {cardCollection[0] === 'loading' ? null : searchResults
                    .sort((a, b) => b.dateCreated.seconds.valueOf() - a.dateCreated.seconds.valueOf())
                    .map(
                    card =>
                        <Flex
                        flexDirection="column"
                        justifyContent="space-between"
                        key={card.id} 
                        spacing="1rem"
                        borderWidth="1px"
                        rounded="lg"
                        px="3rem"
                        py="2rem"
                        minHeight="sm"
                        maxWidth="36rem"
                        >
                            <Flex>
                                <PlayAudio side={"front-audio" + card.id} source={card.frontAudioURL}/>
                                <Text fontSize="lg">{card.front}</Text>
                            </Flex>
                            <Divider />
                            <Flex>
                                <PlayAudio side={"back-audio" + card.id} source={card.backAudioURL}/>
                                <Text>{card.back}</Text>
                            </Flex>
                            <Divider />
                            <Text>{card.originLanguageName}/{card.targetLanguageName}</Text>
                            
                            <Flex justifyContent="space-between" py="1rem">
                                <Button as={Link} variant="outline" to={`/edit-card/${card.id}`} user={user} id={card.id}>Edit</Button>
                            
                            <DeleteCard user={user} id={card.id} handleMessage={handleMessage} />

                            </Flex>
                            <Text fontSize="sm">Created: {moment.unix(card.dateCreated.seconds).calendar()}</Text>
                        </Flex>
                    )}

            
           
         </SimpleGrid> : 
            <Flex justifyContent="Center" alignItems="Center" mx={{sm:10, md:40}}>
                <Box>
                    <Spinner color="tomato" />
                </Box>
            </Flex>
            }
        
        </>
  )}

export default DisplayCards;