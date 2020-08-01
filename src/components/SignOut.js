import React from 'react';
import { signOut } from '../firebase'

const SignOut = () => {

    return(
      <button onClick={signOut}>Sign Out</button>  
    )
}

export default SignOut;