import { signOut } from '../firebase'

import { Button } from '@chakra-ui/react'

/* Tell firebase to signout this user */

const SignOut = () => {

  return (
    <Button onClick={signOut}>Sign Out</Button>
  )
}

export default SignOut;