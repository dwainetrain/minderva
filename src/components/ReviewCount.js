import React from 'react'

import { NavLink } from 'react-router-dom';
import { Button, Box, Flex, Heading } from '@chakra-ui/core'

const ReviewCount = ({ cardCollection }) => {
    return(
        <Flex flexDirection="column" justifyContent="space-around" alignItems="center" minH="sm" minW="lg" maxW="lg" >
            <Box textAlign="center">
            <Box fontWeight="semibold">
                You Have
            </Box>
            <Flex justifyContent="center">
                <Heading fontSize="10rem" fontFamily="span" fontWeight="100"
                lineHeight="10rem">{cardCollection.length}</Heading>
            </Flex>
            <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                
            >
                Cards Ready for Review
            </Box>
            </Box>
            <Button as={NavLink} px={2} to="/quiz" size="lg" variantColor="teal" variant="outline" style={{ textDecoration: 'none' }}>Review Now</Button>
        </Flex>
    )
}

export default ReviewCount;