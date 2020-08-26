import React from 'react'
import Quote from './Quote'
import { Box, Flex, Divider, Spinner } from '@chakra-ui/core'
import NoCards from './NoCards'
import { Helmet } from 'react-helmet-async'
import ReviewCount from './ReviewCount'

const Review = ({ cardCollection, cardsLoaded }) => {
    return(
        <Flex ml="10rem" justifyContent="space-between" width="80%" mt={10}>
            <Helmet>
                <title>Minderva | Review</title>
            </Helmet>
            <Box>
            {!cardsLoaded ? 
                <Flex justifyContent="Center" alignItems="Center" mx={{sm:10, md:40}}>
                    <Box>
                        <Spinner color="tomato" />
                    </Box>
                </Flex>
                : cardCollection.length === 0 ? 
                <NoCards />
                :
                <ReviewCount cardCollection={ cardCollection } mx={{sm:10, md:40}} />
                }
            </Box>
                <Divider orientation="vertical" mr={10}/>
            <Box d="flex" alignItems="center">
                <Quote />                
            </Box>
            
        </Flex>
    )}

export default Review;