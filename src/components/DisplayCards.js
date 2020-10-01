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

    /* Grid of cards that are in user's collection */

const DisplayCards = ({ cardCollection, user, handleMessage, cardsLoaded })  =>{
  
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
            // Just a very basic search
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
        <Box px={{sm:10, md:24}} py={4} width="100%">
            <Helmet>
                <title>Minderva | Card Collection</title>
            </Helmet>
            <Flex justifyContent="space-between" alignItems="flex-end">
                <InputGroup>
                    <InputLeftElement children={<Icon name="search" color="gray.300" />} />
                    <Input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search"/>
                </InputGroup>
                <Text>Showing {searchResults.length} of {cardCollection.length} total cards</Text>
            </Flex>
        </Box>
        {cardsLoaded ? 
        
            <SimpleGrid columns={[2, null, 3]} spacing="32px" px={{sm:10, md:24}} pb="5rem" minChildWidth="20rem">
                   {cardCollection.length === 0 ? <NoCards /> : null }
                    {cardCollection[0] === 'loading' ? null : searchResults
                    .sort((a, b) => b.dateCreated.seconds.valueOf() - a.dateCreated.seconds.valueOf())
                    .map(
                    card =>
                        <Flex
                        flexDirection="column"
                        justifyContent="space-between"
                        key={card.id} 
                        borderWidth="1px"
                        rounded="lg"
                        px="3rem"
                        py="2rem"
                        maxWidth="36rem"
                        minHeight="16rem"
                        >
                            <Flex>
                                <PlayAudio side={"front-audio" + card.id} source={card.frontAudioURL}/>
                                <Text fontSize="md">{card.front}</Text>
                            </Flex>
                            <Divider />
                            <Flex>
                                <PlayAudio side={"back-audio" + card.id} source={card.backAudioURL}/>
                                <Text  fontSize="md">{card.back}</Text>
                            </Flex>
                            <Divider />
                            <Text>{card.originLanguageName}/{card.targetLanguageName}</Text>
                            
                            <Flex justifyContent="space-between" py={3}>
                                <Button as={Link} size="sm"variant="outline" to={`/edit-card/${card.id}`} user={user} id={card.id}>Edit</Button>
                            
                            <DeleteCard user={user} id={card.id} handleMessage={handleMessage} />

                            </Flex>
                            <Text fontSize="xs" color="grayGreen.800">Created: {moment.unix(card.dateCreated.seconds).calendar()}</Text>
                        </Flex>
                    )}

            
           
         </SimpleGrid> : 
            <Flex justifyContent="Center" alignItems="Center" mx={{sm:10, md:24}}>
                <Box>
                    <Spinner color="tomato" />
                </Box>
            </Flex>
            }
        
        </>
  )}

export default DisplayCards;