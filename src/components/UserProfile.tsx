import React from 'react';
import Authentication from './Authentication';

// Types
import { UserRouteModel } from './@types/card';


/* Calls for authentication of user, maybe redundant */

const UserProfile = ({ user, userLangPrefs, handleMessage }: UserRouteModel) => (
    <div>
        <Authentication user={user} userLangPrefs={userLangPrefs} handleMessage={handleMessage} />
    </div>
)

export default UserProfile;
