import React from 'react';
import moment from 'moment';

const CurrentUser = ({ displayName, email, createdAt }) => {

    return(
        <div>
            <p>Hello {displayName}!</p>
            <p>Your email: {email}</p>
            <p>Cake Day: {moment(createdAt).calendar()}</p>

            <button>Sign Out</button>
        </div>
    )
}

CurrentUser.defaultProps = {
    displayName: 'HAL',
    email: 'dwaine.best@gmail.com',
    createdAt: new Date(),
}

export default CurrentUser;