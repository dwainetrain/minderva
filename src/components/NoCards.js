import React from 'react'
import { Flex, Text, Button } from '@chakra-ui/core'
import { NavLink } from 'react-router-dom'

const NoCards = () => {
    return(
        <Flex flexDirection="column" justifyContent="center" alignItems="flex-start" minH="sm" minW="sm" maxW="md">
                <Text>Add some cards to get started with Minderva.</Text>
                    <Button size="lg" variantColor="teal" variant="outline" style={{ textDecoration: 'none' }} as={NavLink} to="/add-cards" mt={10}>Add Cards</Button>
                </Flex>
    )
}

export default NoCards