import React from 'react';
import SignOut from './SignOut';

const CurrentUser = ({ displayName, email }) => {

    return(
        <div>
            <p>Hello {displayName}!</p>
            <p>Your email: {email}</p>
            <SignOut />
        </div>
    )
}

export default CurrentUser;