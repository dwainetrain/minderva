import React from 'react';
import { signInWithGoogle } from '../firebase';
import logo from './assets/mstile-150x150.png'

import {
  Flex,
  Box,
  Heading,
  Button,
  Image
} from '@chakra-ui/core';

/* Login screen if user isn't logged-in, only handle google sign-in at the moment */

const LoginForm = () => {

    const handleSubmit = (e) => {
      e.preventDefault();
    }


    return(
    <Flex height="75vh" width="full" align="center" justifyContent="center">
      
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8}>
        <Box d="flex" alignItems="center" justifyContent="center">
          <Image size="50px" objectFit="cover" src={logo} mb={3} />
        </Box>
        <Box>
            <Heading as="h1" fontSize="3xl" fontFamily="span" color="tomato" textAlign="center">Minderva</Heading>
        </Box>
        <Box textAlign="center">
          <Heading as="h6" size="sm" color="grayGreen.800">A Language Learning Tool</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <Button type="submit" variantColor="teal" size="md" variant="outline" width="full" mt={4} onClick={signInWithGoogle}>Sign in with Google</Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default LoginForm;