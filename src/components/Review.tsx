import React from 'react'
import Quote from './Quote'
import { Box, Flex, Divider, Spinner } from '@chakra-ui/core'
import NoCards from './NoCards'
import { Helmet } from 'react-helmet-async'
import ReviewCount from './ReviewCount'

/* Review page, shows quote and cards up for review. More to be added in the future. */

const Review = ({ cardCollection, cardsLoaded }) => {
    return(
        <Flex ml={{sm:8, md:20}} flexDirection={{sm:"column", md:"row"}} flex="wrap" alignItems={{sm:"center", md:"initial"}} mt={{sm:0, md: 4}}>
            <Helmet>
                <title>Minderva | Review</title>
            </Helmet>
            <Box>
            {!cardsLoaded ? 
                <Flex justifyContent="center" alignItems="center" mx={{sm:10, md:16}}>
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
            <Divider orientation='vertical' borderColor={{sm:"grayGreen.200"}} display={{sm:"none", md:'initial'}} maxH="sm"/>
            <Divider borderColor={{sm:"grayGreen.200"}} minW="sm" display={{sm:"initial", md:'none'}} mb={4}/>
            <Box d="flex" alignItems="center" maxW="sm" ml={{sm:0, md:6}}>
                <Quote />                
            </Box>
            
        </Flex>
    )}

export default Review;