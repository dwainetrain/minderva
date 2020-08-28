import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { signInWithGoogle } from '../firebase';
import logo from './assets/mstile-150x150.png'
import { auth } from '../firebase'

import {
  Flex,
  Box,
  Heading,
  Button,
  Image
} from '@chakra-ui/core';



const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        await auth.signInWithEmailAndPassword(email, password);
        history.push("/")
      }
      catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ...
      };
    }


    return(
    <Flex height="75vh" width="full" align="center" justifyContent="center">
      
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8}>
        <Box d="flex" alignItems="center" justifyContent="center">
          <Image size="75px" objectFit="cover" src={logo} mb={3} />
        </Box>
        <Box>
            <Heading fontFamily="span" color="tomato" textAlign="center">Minderva</Heading>
        </Box>
        <Box textAlign="center">
          <Heading as="h6" size="md" color="grayGreen.800">A Language Learning Tool</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form >
            <Button type="submit" variantColor="teal" size="md" variant="outline" width="full" mt={4} onClick={signInWithGoogle}>Sign in with Google</Button>
          </form>

          <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
            />

            <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            />

            <button>Log In</button>
            
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default LoginForm;