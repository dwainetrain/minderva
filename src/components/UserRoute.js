import React from 'react';
import Nav from './Nav';
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import AddCard from './AddCard';
import Quiz from './Quiz';
import Review from './Review';
import EditCard from './EditCard';
import { Route, Switch, useLocation } from 'react-router-dom';
import DisplayCards from './DisplayCards';
import NotFound from './NotFound'
import About from './About'


const UserRoute = ({ user, cardCollection, handleMessage, userLangPrefs }) => {
    const location = useLocation();
    return(
        <>
        <header className="App-header">
            {location.pathname === "/quiz" ? null : <Nav />}
        </header>
        <div>
            <Switch>
                <Route exact path="/" render=
                {() =>
                    <Dashboard user={user} cardCollection={cardCollection}/>
                }/>
                
                <Route exact path="/review" render=
                {() =>
                <Review path="/review" cardCollection={cardCollection} />
                }/>

                <Route exact path="/quiz" render=
                {() =>
                <Quiz path="/quiz" cardCollection={cardCollection}/>
                }/>
                
                <Route exact path="/card-collection" render=
                {() =>
                <DisplayCards path="/card-collection" cardCollection={cardCollection} user={user} handleMessage={handleMessage}/>
                }/>

                <Route exact path="/edit-card/:id" render=
                //
                {(routeParams) =>
                <EditCard {...routeParams} user={user} handleMessage={handleMessage} />
                }/>
                
                <Route exact path="/add-cards" render=
                {() =>
                <AddCard handleMessage={handleMessage} userLangPrefs={userLangPrefs} />
                }/>
                
                <Route exact path="/user-profile" render=
                {() =>
                <UserProfile user={user} userLangPrefs={userLangPrefs} handleMessage={handleMessage}/>
                } />

                <Route exact path="/about" render=
                {() =>
                <About />
                } />

                <Route component={NotFound} />
            </Switch>
        </div>
      </>
    )
}

export default UserRoute;