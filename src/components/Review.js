import React from 'react'
import Quote from './Quote'
import { Box, Flex, Divider, Spinner } from '@chakra-ui/core'
import NoCards from './NoCards'
import { Helmet } from 'react-helmet-async'
import ReviewCount from './ReviewCount'

const Review = ({ cardCollection, cardsLoaded }) => {
    return(
        <Flex ml={16} justifyContent="space-between" width="80%" mt={4}>
            <Helmet>
                <title>Minderva | Review</title>
            </Helmet>
            <Box>
            {!cardsLoaded ? 
                <Flex justifyContent="Center" alignItems="Center" mx={{sm:10, md:16}}>
                    <Box>
                        <Spinner color="tomato" />
                    </Box>
                </Flex>
                : cardCollection.length === 0 ?
                <Box ml={8}>
                    <NoCards />
                </Box>
                :
                <ReviewCount cardCollection={ cardCollection } mx={{sm:10, md:16}} />
                }
            </Box>
                <Divider orientation="vertical" mr={10}/>
            <Box d="flex" alignItems="center">
                <Quote />                
            </Box>
            
        </Flex>
    )}

export default Review;