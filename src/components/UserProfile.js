import React from 'react';
import Authentication from '../components/Authentication';

/* Calls for authentication of user, maybe redundent */

const UserProfile = ({ user, userLangPrefs, handleMessage }) => (
    <div>
        <Authentication user={user} userLangPrefs={userLangPrefs} handleMessage={handleMessage}/>
    </div>
)

export default UserProfile;
