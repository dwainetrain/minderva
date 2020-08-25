import React from 'react'
import Quote from './Quote'
import { NavLink } from 'react-router-dom';
import { Button, Box, Flex, Divider } from '@chakra-ui/core'
import NoCards from './NoCards'
import { Helmet } from 'react-helmet-async'
import ReviewCount from './ReviewCount'

const Review = ({ cardCollection }) => {
    return(
        <Flex ml="10rem" justifyContent="space-between" width="80%" mt={10}>
            <Helmet>
                <title>Minderva | Review</title>
            </Helmet>
            <Box>
                <Flex flexWrap="Wrap">
                    {cardCollection.length === 0 ? 
                    <NoCards />
                    :
                    <ReviewCount cardCollection={ cardCollection }/>}
                </Flex>
            </Box>
                <Divider orientation="vertical" mr={10}/>
            <Box d="flex" alignItems="center">
                <Quote />                
            </Box>
            
        </Flex>
    )}

export default Review;