import React from 'react';
import moment from 'moment';
import SignOut from './SignOut';

const CurrentUser = ({ displayName, email, createdAt }) => {

    return(
        <div>
            <p>Hello {displayName}!</p>
            <p>Your email: {email}</p>
            <p>The time is: {moment(createdAt).calendar()}</p>

            <SignOut />
        </div>
    )
}

export default CurrentUser;