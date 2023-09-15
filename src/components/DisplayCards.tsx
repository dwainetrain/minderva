import React, { useEffect, useState } from 'react';
import DeleteCard from './DeleteCard';
import { Link } from 'react-router-dom';
import moment from 'moment'
import PlayAudio from './PlayAudio';
import NoCards from './NoCards'
import { Helmet } from 'react-helmet-async'

// Chakra UI
import {
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    SimpleGrid,
    Box,
    Button,
    Spinner,
    Divider,

} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons'
import { HandleMessage, UserRouteModel, UserWithActions } from './@types/card';

/* Grid of cards that are in user's collection */

interface card {
    id: string,
    front: string,
    back: string,
    dateCreated: { seconds: number, nanoseconds: number },
    frontAudioURL: string,
    backAudioURL: string,
    originLanguageName: string,
    targetLanguageName: string
}

const DisplayCards = ({ cardCollection, user, handleMessage, cardsLoaded }: UserRouteModel) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<card[]>([]);
    const [playingAudio, setPlayingAudio] = useState(false)

    useEffect(() => {
        // Just a very basic search
        if (cardCollection) {
            const searchFilter = () => {
                const frontResults = cardCollection.filter(card => card.front
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))

                const backResults = cardCollection.filter(card => card.back
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))

                const totalResults = [...frontResults, ...backResults]

                setSearchResults([...new Set(totalResults)])
            }

            if (cardCollection[0] !== 'loading') {
                searchFilter()
            }
        }

    }, [cardCollection, searchTerm])

    const playAudio = () => setPlayingAudio(!playingAudio);


    return (
        <>
            <Box px={{ sm: 10, md: 24 }} py={4} width="100%">
                <Helmet>
                    <title>Minderva | Card Collection</title>
                </Helmet>
                <Flex justifyContent="space-between" alignItems="center">


                    <InputGroup width={'auto'} bgColor={'white'} >
                        <InputLeftElement pointerEvents='none' >
                            <Search2Icon color="gray.300" />
                        </InputLeftElement>
                        <Input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" />
                    </InputGroup>
                    <Text>Showing {searchResults.length} of {cardCollection?.length} total cards</Text>
                </Flex>
            </Box>
            {cardsLoaded ?

                <SimpleGrid columns={[2, null, 3]} spacing="32px" px={{ sm: 10, md: 24 }} pb="5rem" minChildWidth="20rem">
                    {cardCollection?.length === 0 ? <NoCards /> : null}
                    {cardCollection ? cardCollection[0] === 'loading' ? null : searchResults
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
                                        {playingAudio ? <PlayAudio side={"front-audio" + card.id} source={card.frontAudioURL} type='' /> : <Button onClick={playAudio}>Dummy</Button>}
                                        <Text fontSize="md">{card.front}</Text>
                                    </Flex>
                                    <Divider />
                                    <Flex>
                                        {playingAudio ? <PlayAudio side={"back-audio" + card.id} source={card.backAudioURL} type='' /> : <Button onClick={playAudio}>Dummy</Button>}
                                        <Text fontSize="md">{card.back}</Text>
                                    </Flex>
                                    <Divider />
                                    <Text>{card.originLanguageName}/{card.targetLanguageName}</Text>

                                    <Flex justifyContent="space-between" py={3}>

                                        <Link to={`/edit-card/${card.id}`} >
                                            <Button size="sm" variant="outline" id={card.id}>Edit</Button>
                                        </Link>

                                        <DeleteCard mode="delete" user={user as UserWithActions} cardId={card.id} handleMessage={handleMessage as HandleMessage} />

                                    </Flex>
                                    <Text fontSize="xs" color="grayGreen.800">Created: {moment.unix(card.dateCreated.seconds).calendar()}</Text>
                                </Flex>
                        )[0] : null}



                </SimpleGrid> :
                <Flex justifyContent="Center" alignItems="Center" mx={{ sm: 10, md: 24 }}>
                    <Box>
                        <Spinner color="tomato" />
                    </Box>
                </Flex>
            }

        </>
    )
}

export default DisplayCards;