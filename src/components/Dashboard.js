import React, { useState } from 'react';
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
    Text
} from '@chakra-ui/core'
import NoCards from './NoCards';

const UserDashboard = ( { cardCollection, loading } ) => {
    return(
        
        <Flex ml="10rem">
            <Helmet>
            <title>Minderva | Dashboard</title>
            </Helmet>
        <Box width="100%" mt={10}>
            <Quote />
            <Flex flexWrap="Wrap">
                {cardCollection[0] === 'loading'  ? <Text>Loading...</Text> 
                : cardCollection.length === 0 ? 
                <NoCards />
                :
                <ReviewCount cardCollection={ cardCollection } />
                }
            <Divider orientation="vertical" mx={40} borderColor="grayGreen.200"/>
                <Flex flexDirection="column" justifyContent="space-around" alignItems="flex-start" minW="lg" maxW="sm" py={8}>
                    <Text fontSize="lg" fontWeight="semibold" color="grayGreen.800" mb={8}>Explore your Minderva</Text>
                    <Box mb={8}>
                        <Button as={Link} style={{ textDecoration: 'none' }} to="/add-cards" mb={3} variant="outline">Add Cards</Button>
                        <Text>
                            Tranaslate words or phrases and add them to your collection.
                        </Text>
                    </Box>
                    
                    <Box mb={8}>
                        <Box>
                            <Button as={NavLink} to="/card-collection" mb={3} variant="outline" style={{ textDecoration: 'none' }}>Card Collection</Button>
                        </Box>
                        <Box>
                            <Text>View, edit or delete your saved cards.</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Button as={NavLink} to="/user-profile" mb={3} size="md" variant="outline" style={{ textDecoration: 'none' }}>User Profile</Button>
                        </Box>
                        <Box>
                            <Text>View your profile and edit default language preferences.</Text>
                        </Box>
                    </Box>
                    
                </Flex>
            </Flex>
            
            <Box my="6rem">
            <Divider mb="2rem"/>
                <Text lineHeight="taller">Minderva is a cobblestone in the cobbled pathway of language study.<br />
                It is a tool that uses flash cards, translation, text-to-speech and motivational cues to keep you learning.<br />
                I hope it helps you get to where you’re going.</Text>
            </Box>
        </Box>
        </Flex>
    )
}

const Dashboard = ({ user, cardCollection }) => {
    ///// Imports the Google Cloud client library
        
        return(
        <div>
                {user ? 
                    <UserDashboard cardCollection={cardCollection}/>
                    : 
                    <LogIn />}
        </div>

    )}

export default Dashboard;

