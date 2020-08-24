import React from 'react'

import { NavLink } from 'react-router-dom';
import { Button, Box, Flex } from '@chakra-ui/core'
import NoCards from './NoCards'
import Helmet from 'react-helmet'

const Review = ({ cardCollection }) => {
    return(
    <div>
        <Flex ml="10rem">
            <Helmet>
                <title>Minderva | Review</title>
            </Helmet>
        <Box width="100%">
            
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
            </Flex>
            
        </Box>
        </Flex>
        
    </div>
    
    )}

export default Review;