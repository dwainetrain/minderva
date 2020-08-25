import React from 'react';
import CurrentUser from './CurrentUser';
import LogIn from './LogIn';

const Authentication = ({ user, userLangPrefs, handleMessage })  => {

    return (
    <div>
        {user ? <CurrentUser {...user} userLangPrefs={userLangPrefs} handleMessage={handleMessage}/> : <LogIn />}
    </div>
    )
}

export default Authentication;