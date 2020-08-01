import React, { useState, useEffect } from 'react';

import Nav from './components/Nav';
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
import AddCard from './components/AddCard';
import CardCollection from './components/CardCollection';
import Quiz from './components/Quiz';
import EditCard from './components/EditCard';

import { Route, Switch } from 'react-router-dom';

import { firestore, auth } from './firebase';
import { collectIdsAndDocs } from './utilities';
import Authentication from './components/Authentication';
// import './App.css';

function App() {

  const [cardCollection, setCardCollection] = useState([]);
  // Auth state
  const [user, setUser] = useState(null);

  // streaming the database, being sure to unsubscribe to avoid memory leaks, I think...
  useEffect(() => {
      const unsubscribeFromFirestore = firestore.collection('cards').onSnapshot(snapshot => {
        const entries = snapshot.docs.map(collectIdsAndDocs)
        setCardCollection(entries);
      });

      const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
        setUser(user)
        console.log(user)
      })

    return () => {
      unsubscribeFromFirestore();
      unsubscribeFromAuth();
    }
    
  }, []);
    
  return (
    <div className="App">
      <h1>Minderva</h1>
      <h2>A Wicked Language Learning Tool</h2>
      <h4>MVP Build 0.06</h4>
      
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
              <CardCollection path="/card-collection" cardCollection={cardCollection} />
            }/>
          
          <Route exact path="/edit-card/:id" render=
            {(cardDetails) => 
              <EditCard {...cardDetails}/>
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