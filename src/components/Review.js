import React from 'react'

import { NavLink } from 'react-router-dom';
import { Button, Box, Text, Divider, Flex } from '@chakra-ui/core'

const Review = ({ cardCollection }) => {
    return(
    <div>
        <Flex ml="10rem">
        <Box width="100%">
            
            <Flex flexWrap="Wrap">
                <Flex flexDirection="column" gap="100px" justifyContent="space-between" alignItems="flex-start" minH="sm" minW="lg" maxW="sm" pt="4rem">
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
                </Flex>
            </Flex>
            
        </Box>
        </Flex>
        
    </div>
    
    )}

export default Review;