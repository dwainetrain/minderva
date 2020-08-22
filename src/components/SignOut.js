import React from 'react';
import { signOut } from '../firebase'

import { Button } from '@chakra-ui/core'

const SignOut = () => {

    return(
      <Button onClick={signOut}>Sign Out</Button>  
    )
}

export default SignOut;