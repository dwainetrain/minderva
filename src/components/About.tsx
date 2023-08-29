import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'

/* Shares basic information about the App */

const About = () => {
    console.log('Your on the About page!')
    return (
        <Box mt={4} px={24}>
            <Text>Minderva was created by Dwaine Best as the final project for the Summer 2020 UCSD Extension Applied Javascript Course.</Text>
            <Text>It was built using React, Chakra UI, the Firebase platform, Google Translate and Google Text-to-Speech</Text>
            <Text>It is in perpetual development. If you'd like, you can view the <Link href="https://github.com/dwainetrain/minderva" color="teal.500">version history</Link>.</Text>
        </Box>
    )
}

export default About;