import React from 'react';
import Nav from './Nav';
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import AddCard from './AddCard';
import Quiz from './Quiz';
import EditCard from './EditCard';
import { Route, Switch } from 'react-router-dom';
import DisplayCards from './DisplayCards';
import NotFound from './NotFound'

/// Styling ///
import { Container } from 'semantic-ui-react'


const UserRoute = ({ user, cardCollection, handleMessage }) => {
    return(
        <>
        <header className="App-header">
            <Nav />
        </header>
        <div>
            <Container>
            <Switch>
                <Route exact path="/" render=
                {() =>
                    <Dashboard user={user} />
                }/>
                
                <Route exact path="/quiz" render=
                {() =>
                <Quiz path="/quiz" cardCollection={cardCollection} />
                }/>
                
                <Route exact path="/card-collection" render=
                {() =>
                <DisplayCards path="/card-collection" cardCollection={cardCollection} user={user} handleMessage={handleMessage}/>
                }/>

                <Route exact path="/edit-card/:id" render=
                // cardDetails - What's in it and where is it coming from? I've forgotten
                {(routeParams) =>
                <EditCard {...routeParams} user={user} handleMessage={handleMessage}/>
                }/>
                
                <Route exact path="/add-cards" render=
                {() =>
                <AddCard handleMessage={handleMessage}/>
                }/>
                
                <Route exact path="/user-profile" render=
                {() =>
                <UserProfile user={user}/>
                } />

                <Route component={NotFound} />
            </Switch>
            </Container>
        </div>
      </>
    )
}

export default UserRoute;