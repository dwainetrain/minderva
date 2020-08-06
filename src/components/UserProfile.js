import React from 'react';
import Authentication from '../components/Authentication';

const UserProfile = ({ user }) => (
    <div>
        <h2>User Profile Page</h2>
        <Authentication user={user}/>
    </div>
)

export default UserProfile;
