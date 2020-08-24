import React, { useState } from 'react';
import SignInAndSignUp from './SignInAndSignUp'
import './Dashboard.css'
import { NavLink } from 'react-router-dom'
import Helmet from 'react-helmet'

import {
    Box,
    Flex,
    Divider,
    Button,
    Text
} from '@chakra-ui/core'
import NoCards from './NoCards';

const UserDashboard = ( { cardCollection } ) => {

    const [word, setWord] = useState('奇妙さ')
    const wordReveal = {
        originalWord: '奇妙さ',
        revealWord:'strangeness'
    }

    return(
        
        <Flex ml="10rem">
            <Helmet>
            <title>Minderva | Dashboard</title>
            </Helmet>
        <Box width="100%">
            <div className="quote--container">
            <span className="quote">
                There is no exquisite beauty without some
                <span className="quote--highlight" 
                onMouseEnter={() => setWord(wordReveal.revealWord)} 
                onMouseLeave={() => setWord(wordReveal.originalWord)}>
                     &nbsp;{word}
            </span> in the proportion.
            </span>
            <span className="quote--author">&ndash; Francis Bacon</span>
            </div>
            <Flex flexWrap="Wrap">
                {cardCollection.length === 0 ? 
                <NoCards />
                :
                <Flex flexDirection="column" gap="100px" justifyContent="space-between" alignItems="center" minH="sm" minW="lg" maxW="sm" p={6}>
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        lineHeight="0"
                        as="h4"
                    >
                        You Have
                    </Box>
                    <Box
                     fontSize="10rem"
                     lineHeight="tight"
                     fontFamily="Playfair Display"
                    >
                    {cardCollection.length}
                    </Box>
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                    >
                        Cards Ready for Review
                    </Box>
                    <Button as={NavLink} px={2} to="/quiz">Review Now</Button>
                </Flex>}
            <Divider orientation="vertical" ml="10rem" mr="10rem"/>
                <Flex flexDirection="column" justifyContent="space-between" alignItems="flex-start" minW="lg" maxW="sm" p={6}>
                    <Text>Explore Your Minderva:</Text>
                    <Box>
                        <Button as={NavLink} to="/add-cards">Add Cards</Button>
                        <Text>
                            Tranaslate words or phrases and add them to your collection.
                        </Text>
                    </Box>
                    <Box>
                        <Box>
                            <Button as={NavLink} to="/card-collection">Card Collection</Button>
                        </Box>
                        <Box>
                            <Text>View, edit or delete your saved cards.</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Button as={NavLink} to="/user-profile">User Profile</Button>
                        </Box>
                        <Box>
                            <Text>View your profile and edit preferences.</Text>
                        </Box>
                    </Box>
                    
                </Flex>
            </Flex>
            
            <Box my="6rem">
            <Divider mb="2rem"/>
                <Text>Minderva is a cobblestone in the cobbled pathway of language study.</Text>
                <Text>It is a tool that uses flash cards, translation, text-to-speech and motivational cues to keep you learning.</Text>
                <Text>I hope it helps you get to where you’re going.</Text>
                <Text>It was created by Dwaine Best as the final for the UCSD Extension Applied Javascript Course.</Text>
                <Text>It was built using React, Chakra UI, the Firebase platform, Google Translate and Google Text-to-Speech</Text>
                <Text>It is in perpetual development, view the roadmap and contribute if you'd like.</Text>
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
                    <SignInAndSignUp />}
        </div>

    )}

export default Dashboard;

