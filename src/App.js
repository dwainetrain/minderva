import React, { useState, useEffect } from 'react';

import Nav from './components/Nav';
import Dashboard from './components/Dashboard'
import UserProfile from './components/UserProfile'
import AddCard from './components/AddCard';
import CardCollection from './components/CardCollection';
import Quiz from './components/Quiz';
import EditCard from './components/EditCard';

import { Route, Switch } from 'react-router-dom';

import { firestore } from './firebase';
import { collectIdsAndDocs } from './utilities';
// import './App.css';

function App() {

  // Add Card State - to be pushed into their own respective components
  // const [id, setId] = useState('');
  // const [front, setFront] = useState('');
  // const [back, setBack] = useState('');
  const [cardCollection, setCardCollection] = useState([]);

  // Update
  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   const filterCollection = cardCollection.filter(card => card.id !== id)
  //   setCardCollection([{
  //     id:id,
  //     front:front,
  //     back:back
  //   }, ...filterCollection])
  // }

  // streaming the database, being sure to unsubscribe to avoid memory leaks, I think...
  useEffect(() => {
      const unsubscribe = firestore.collection('cards').onSnapshot(snapshot => {
        const entries = snapshot.docs.map(collectIdsAndDocs)
        setCardCollection(entries);
        console.log('Rerendered!')
      });

    return () => {
      unsubscribe();
    }
    
  }, []);
    
  return (
    <div className="App">
      <h1>Minderva - MVP Build 0.04</h1>
      
      <header className="App-header">
        <Nav />
      </header>
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/quiz" render={Quiz} />
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