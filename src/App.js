import React, { useState, useEffect } from 'react';

import Nav from './components/Nav';
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
import AddCard from './components/AddCard';
// import CardCollection from './components/CardCollection';
import Quiz from './components/Quiz';
import EditCard from './components/EditCard';

import { Route, Switch } from 'react-router-dom';

import { firestore, auth } from './firebase';
import { collectIdsAndDocs } from './utilities';
import Authentication from './components/Authentication';
import DisplayCards from './components/DisplayCards';
// import './App.css';

function App() {

  const [cardCollection, setCardCollection] = useState([]);
  // Auth state
  const [user, setUser] = useState(null);

  // streaming the database, being sure to unsubscribe to avoid memory leaks, I think...
  useEffect(() => {
    // This is possibly super unsecure! Check to see if exposing user ids in a firestore database is good or bad practice
      const unsubscribeFromFirestore = firestore.collection(`${user ? `users/${user.uid}/cards` : null}`)
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(collectIdsAndDocs)
        setCardCollection(entries);
      });

      const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
        setUser(user)
      })

    return () => {
      unsubscribeFromFirestore();
      unsubscribeFromAuth();
    }
    
  }, [user]);
    
  return (
    <div className="App">
      <h1>Minderva</h1>
      <h2>A Wicked Language Learning Tool</h2>
      <h4>MVP Build 0.07</h4>
      
      <header className="App-header">
        <Nav />
      </header>
      <Authentication user={user}/>
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          
          <Route exact path="/quiz" render=
            {() => 
              <Quiz path="/quiz" cardCollection={cardCollection} />
            }/>

          <Route exact path="/card-collection" render=
            {() => 
              <DisplayCards path="/card-collection" cardCollection={cardCollection} user={user}/>
            }/>
          
          <Route exact path="/edit-card/:id" render=
            {(cardDetails) =>
              <EditCard {...cardDetails} user={user}/>
            }/>

          <Route exact path="/add-cards" render=
            {() => 
              <AddCard />
            }/>
          
          <Route exact path="/user-profile" render=
            {() =>
              <UserProfile />
            } />
        </Switch>
      </div>
    </div>
  );
}

export default App;