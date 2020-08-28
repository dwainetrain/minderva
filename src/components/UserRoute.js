import React from 'react';
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import AddCard from './AddCard';
import EditCard from './EditCard'
import Quiz from './Quiz';
import Review from './Review';
import { Route, Switch, useLocation } from 'react-router-dom';
import DisplayCards from './DisplayCards';
import NotFound from './NotFound'
import About from './About'
import Header from './Header'


const UserRoute = ({ user, cardCollection, handleMessage, userLangPrefs, loading, cardsLoaded }) => {
    const location = useLocation();
    return(
        <>
        <header className="App-header">
            {location.pathname === "/quiz" ? null : <Header />}
        </header>
        <div>
            <Switch>
                <Route exact path="/" render=
                {() =>
                    <Dashboard user={user} cardCollection={cardCollection} loading={loading} cardsLoaded={cardsLoaded}/>
                }/>
                
                <Route exact path="/review" render=
                {() =>
                <Review path="/review" cardCollection={cardCollection} cardsLoaded={cardsLoaded}/>
                }/>

                <Route exact path="/quiz" render=
                {() =>
                <Quiz path="/quiz" cardCollection={cardCollection}/>
                }/>
                
                <Route exact path="/card-collection" render=
                {() =>
                <DisplayCards path="/card-collection" cardCollection={cardCollection} user={user} handleMessage={handleMessage} cardsLoaded={cardsLoaded}/>
                }/>

                <Route exact path="/edit-card/:id" render=
                //
                {(routeParams) =>
                    <EditCard 
                    {...routeParams} 
                    handleMessage={handleMessage}
                    user={user}
                    userLangPrefs={userLangPrefs} 
                    />
                } />
                
                <Route exact path="/add-cards" render=
                {(routeParams) =>
                <AddCard 
                    {...routeParams} 
                    handleMessage={handleMessage}
                    user={user}
                    userLangPrefs={userLangPrefs} 
                    mode="add"/>
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