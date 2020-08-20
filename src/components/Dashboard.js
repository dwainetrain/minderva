import React, { useState } from 'react';
import SignInAndSignUp from './SignInAndSignUp'
import './Dashboard.css'
import { NavLink } from 'react-router-dom'

import {
    Box,
    Flex,
    Divider,
    Heading,
    Button,
    Text
} from '@chakra-ui/core'
import { Link } from 'react-router-dom';

const UserDashboard = () => {

    const [word, setWord] = useState('奇妙さ')
    const wordReveal = {
        originalWord: '奇妙さ',
        revealWord:'strangeness'
    }

    return(
        <Flex ml="10rem">
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
                    50
                    </Box>
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                    >
                        Cards Ready for Review
                    </Box>
                    <Button as={NavLink} px={2} to="/quiz">Review Now</Button>
                </Flex>
                <Divider orientation="vertical" ml="10rem" mr="10rem"/>
                <Flex flexDirection="column" justifyContent="space-between" alignItems="center" minW="lg" maxW="sm" p={6}>
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        fontSize="3rem"
                    >
                        Your Card Collection
                    </Box>
                    <Box>
                        <Text>250 Japanese/English Cards</Text>
                        <Text>15 Japanese/Korean Cards</Text>
                    </Box>
                    <Box width="100%" d="flex" justifyContent="space-around">
                        <Button>Add Cards</Button>
                        <Button>Card Collection</Button>
                    </Box>

                </Flex>
            </Flex>
            
            <Box my="6rem">
            <Divider mb="2rem"/>
                <Text>Minderva is a cobblestone in the cobbled pathway of language study.</Text>
                <Text>It is a tool that uses flash cards, translation, text-to-speech and motivational cues to keep you learning.</Text>
                <Text>I hope it helps you get to where you’re going.</Text>
                <Text>It was created by Dwaine Best as the final for the UCSD Extension Applied Javascript Course.</Text>
                <Text>It was built using React, the Firebase Platform, Google Translate and Google Text-to-Speech</Text>
                <Text>It is in perpetual development, view the roadmap and contribute if you'd like.</Text>
            </Box>
        </Box>
        </Flex>
    )
}

const Dashboard = ({ user }) => {
    ///// Imports the Google Cloud client library
        
        return(
        <div>
                {user ? 
                    <UserDashboard />
                    : 
                    <SignInAndSignUp />}
        </div>

    )}

export default Dashboard;

