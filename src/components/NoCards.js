import React from 'react'
import { Flex, Text, Button } from '@chakra-ui/core'
import { NavLink } from 'react-router-dom'

const NoCards = () => {
    return(
        <Flex flexDirection="column" gap="100px" justifyContent="space-between" alignItems="center" minH="sm" minW="lg" maxW="sm" p={6}>
                <Text>It appears you have no cards in your collection. You can get started with Minderva by adding some language cards.</Text>
                <Button as={NavLink} to="/add-cards">Add Cards</Button>
                </Flex>
    )
}

export default NoCards