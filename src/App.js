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
  const [id, setId] = useState('');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [cardCollection, setCardCollection] = useState([]);

  // Create on firebase
  const handleCreate = async (front, back) => {
    const card = {front:front, back:back}
    const docRef = await firestore.collection('cards').add(card);
    const doc = await docRef.get();
    console.log(doc);
  }

  // Delete
  const handleDelete = (e) => {
    e.preventDefault();
    const filterCollection = cardCollection.filter(card => card.id !== e.target.value);
    setCardCollection(filterCollection);
  }

  // Update
  const handleEdit = (e) => {
    e.preventDefault();
    const filterCollection = cardCollection.filter(card => card.id !== id)
    setCardCollection([{
      id:id,
      front:front,
      back:back
    }, ...filterCollection])
  }

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore.collection('cards').get();
      const entries = snapshot.docs.map(collectIdsAndDocs);
      setCardCollection(entries);
    }

    fetchData();
    
  }, []);
    
  return (
    <div className="App">
      <h1>Minderva - MVP Build 0.03</h1>
      
      <header className="App-header">
        <Nav />
      </header>
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/quiz" render={Quiz} />
          <Route exact path="/card-collection" render=
          {() => 
            <CardCollection 
              path="card-collection" 
              cardCollection={cardCollection}
              handleDelete={handleDelete}>
              <EditCard 
                path="edit-card" 
                handleEdit={handleEdit}
                setBack={setBack}
                setId={setId}
                setFront={setFront} 
                id={id}
                front={front}
                back={back} />
            </CardCollection>
          }/>
          <Route exact path="/add-cards" render=
          {() => 
            <AddCard 
              path="add-card"
              handleCreate={handleCreate}
            />
          }/>
          <Route exact path="/user-profile" render=
          {() =>
            <UserProfile path="user-profile" />
          } />
        </Switch>
      </div>
    </div>
  );
}

export default App;