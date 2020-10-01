import React from 'react'

import { NavLink } from 'react-router-dom';
import { Button, Box, Flex, Heading } from '@chakra-ui/core'

/* If cards are in the database, shows number of cards up for review */

const ReviewCount = ({ cardCollection }) => {
    return(
        <Flex flexDirection="column" justifyContent="space-around" alignItems="center" minH="16rem" minW={{sm:48, md:'sm'}} maxW="md" >
            <Box textAlign="center" >
                <Box fontWeight="semibold">
                    You Have
                </Box>
                <Flex justifyContent="center">
                    <Heading fontSize="8rem" fontFamily="span" fontWeight="100" lineHeight="8rem"
                    >{cardCollection.length}</Heading>
                </Flex>
                <Box
                    fontWeight="semibold"
                    as="h4"
                    
                >
                    Cards Ready for Review
                </Box>
                <Button as={NavLink} mt={6} px={2} to="/quiz" size="md" variantColor="teal" variant="outline">Review Now</Button>
            </Box>
            
        </Flex>
    )
}

export default ReviewCount;