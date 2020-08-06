import React from 'react';
import SignInAndSignUp from './SignInAndSignUp'

const Dashboard = ({ user }) => {
    ///// Imports the Google Cloud client library
        
        return(
        <div>
        <h1>Dashboard</h1>
            {user ? "Welcome!" : <SignInAndSignUp />}
        </div>

    )}

export default Dashboard;

