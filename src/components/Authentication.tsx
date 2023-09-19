import React from 'react';
import CurrentUser from './CurrentUser';
import LogIn from './LogIn';

// Types
import { UserRouteModel } from './@types/card';

/* Checks authentication of user, if user is valid, display user profile, otherwise back to login */

const Authentication = ({ user, userLangPrefs, handleMessage }: UserRouteModel) => {
    // const { uid, email } = user!;
    return (
        <div>
            {user ? <CurrentUser user={user} userLangPrefs={userLangPrefs!} handleMessage={handleMessage!} /> : <LogIn />}
        </div>
    )
}

export default Authentication;