import React from 'react'
import { Stack, Flex, Text, Button, Image, Box } from '@chakra-ui/core'
import { NavLink } from 'react-router-dom'

const NoCards = () => {
    return(
        <Flex flexDirection="column" justifyContent="center" alignItems="flex-start" minH="sm" minW="lg" maxW="lg">
                <Text>Get started with Minderva by adding some language cards.</Text>
                    <Button size="lg" variantColor="teal" variant="outline" style={{ textDecoration: 'none' }} as={NavLink} to="/add-cards" mt={10}>Add Cards</Button>
                </Flex>
    )
}

export default NoCards