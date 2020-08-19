import React from 'react'

import { NavLink } from 'react-router-dom';
import { Button } from '@chakra-ui/core'

const Review = ({ cardCollection }) => {
    return(
    <div>
        <h2>Welcome to the Review Page</h2>
        <p>You have {cardCollection.length} cards up for review</p>
        <Button as={NavLink} px={2} to="/quiz">Review Now</Button>
    </div>
    
    )}

export default Review;