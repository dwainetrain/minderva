import React from 'react';
import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';

const Authentication = ({ user, userLangPrefs, handleMessage })  => {

    return (
    <div>
        {user ? <CurrentUser {...user} userLangPrefs={userLangPrefs} handleMessage={handleMessage}/> : <SignInAndSignUp />}
    </div>
    )
}

export default Authentication;