import React from 'react';
import LogIn from './LogIn'
import { NavLink, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReviewCount from './ReviewCount'
import Quote from './Quote'

import {
    Box,
    Flex,
    Divider,
    Button,
    Text,
    Spinner,
    Stack
} from '@chakra-ui/core'
import NoCards from './NoCards';

const UserDashboard = ( { cardCollection, cardsLoaded } ) => {
    return(
        <Flex ml={{sm:0, md:24 }}>
            <Helmet>
            <title>Minderva | Dashboard</title>
            </Helmet>
        <Box width="100%" mt={4} >
            <Box ml={{sm:10, md:0 }}>
                <Quote />
            </Box>
            <Flex flexDirection={{sm:"column", md:"row"}} flex="wrap" alignItems={{sm:"center", md:"initial"}}>
                {!cardsLoaded ? 
                <Flex justifyContent="center" alignItems="center" mx={{sm:10, md:16}}>
                    <Box>
                        <Spinner color="tomato" />
                    </Box>
                </Flex>
                : cardCollection.length === 0 ? 
                <NoCards />
                :
                <ReviewCount cardCollection={ cardCollection } mx={{sm:0, md:12, lg:16}}/>
                }
            
                <Divider orientation='vertical' borderColor={{sm:"grayGreen.200"}} display={{sm:"none", md:'initial'}}/>
            
                <Flex flexDirection="column" justifyContent="space-around" alignItems="flex-start" minW="sm" maxW="sm" py={6} mx={{sm:10, md:12, lg:16}} px={{sm:6}} borderWidth={{sm:"1px", md:0}}>
                    <Text fontSize="lg" fontWeight="semibold" color="grayGreen.800" mb={8}>Explore your Minderva</Text>
                    <Box mb={6}>
                        <Button as={Link} size="sm" to="/add-cards" mb={3} variant="outline">Add Cards</Button>
                        <Text>
                            Tranaslate words or phrases and add them to your collection.
                        </Text>
                    </Box>
                    
                    <Box mb={6}>
                        <Box>
                            <Button as={NavLink} to="/card-collection" size="sm" mb={3} variant="outline" flexShrink="1">Card Collection</Button>
                        </Box>
                        <Box>
                            <Text>View, edit or delete your saved cards.</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Button as={NavLink} to="/user-profile" mb={3} size="sm" variant="outline">User Profile</Button>
                        </Box>
                        <Box>
                            <Text>View your profile and edit default language preferences.</Text>
                        </Box>
                    </Box>
                    
                </Flex>
            </Flex>
            
            <Stack mt={5} mb={10} ml={{sm:10, md:0 }} spacing={4}>
            <Divider mb={4} mr={32} />
                <Text>Minderva is a cobblestone in the cobbled pathway of language study.</Text>
                <Text>It is a tool that uses flash cards, translation, text-to-speech and motivational cues to keep you learning.</Text>
                <Text>I hope it helps you get to where you’re going.</Text>
            </Stack>
        </Box>
        </Flex>
    )
}

const Dashboard = ({ user, cardCollection, loading, cardsLoaded }) => {
        return(
        <div>
                {user ? 
                    <UserDashboard cardCollection={cardCollection} cardsLoaded={cardsLoaded}/>
                    : 
                    <LogIn />}
        </div>

    )}

export default Dashboard;

