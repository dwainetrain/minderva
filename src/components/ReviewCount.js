import React from 'react'

import { NavLink } from 'react-router-dom';
import { Button, Box, Flex, Heading } from '@chakra-ui/core'

const ReviewCount = ({ cardCollection }) => {
    return(
        <Flex flexDirection="column" justifyContent="space-around" alignItems="center" minH="sm" minW="sm" maxW="md" >
            <Box textAlign="center">
            <Box fontWeight="semibold">
                You Have
            </Box>
            <Flex justifyContent="center">
                <Heading fontSize="8rem" fontFamily="span" fontWeight="100"
                >{cardCollection.length}</Heading>
            </Flex>
            <Box
                fontWeight="semibold"
                as="h4"
                
            >
                Cards Ready for Review
            </Box>
            </Box>
            <Button as={NavLink} px={2} to="/quiz" size="md" variantColor="teal" variant="outline">Review Now</Button>
        </Flex>
    )
}

export default ReviewCount;