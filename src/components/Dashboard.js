import React from 'react';
import SignInAndSignUp from './SignInAndSignUp'
import { Container, Header } from 'semantic-ui-react'

const Dashboard = ({ user }) => {
    ///// Imports the Google Cloud client library
        
        return(
        <Container>
            <Header dividing as="h1" size="huge">Dashboard</Header>
                {user ? "Welcome!" : <SignInAndSignUp />}
        </Container>

    )}

export default Dashboard;

