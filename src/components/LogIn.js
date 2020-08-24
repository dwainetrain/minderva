// Just building out a basic login form to be integrated later into the actual app
import { signInWithGoogle } from '../firebase';

import React from 'react';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/core';

const handleSubmit = (e) => {
    e.preventDefault();
    // Not sure what this should do yet,
    // because we're sending the value to firebase auth
    //console.log('You signed up!')
}

const LoginForm = () => {
    return(
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8}>
      <h1>Minderva - A Language Learning Tool</h1>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <Button type="submit" variantColor="teal" variant="outline" width="full" mt={4} onClick={signInWithGoogle}>Sign In with Google</Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default LoginForm;