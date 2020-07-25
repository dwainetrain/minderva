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

  // Create on firebase, unsubscribed option, also updating local state
  // const handleCreate = async (front, back) => {
  //   const card = {front:front, back:back}
  //   // add a card and get its doc ref
  //   const docRef = await firestore.collection('cards').add(card);
  //   // get the card back from the database
  //   const doc = await docRef.get();
  //   // map over data
  //   const newCard = collectIdsAndDocs(doc);
  //   // add to state
  //   setCardCollection([newCard, ...cardCollection])
    
  // }

  // Create on firebase
  const handleCreate = async (front, back) => {
    const card = {front:front, back:back}
    await firestore.collection('cards').add(card);
  }

  // // Delete if not subscribing to database
  // const handleRemove = async (id) => {
    
  //   await firestore.doc(`cards/${id}`).delete();

  //   const filterCollection = cardCollection.filter(card => card.id !== id);
    
  //   setCardCollection(filterCollection);
  // }

  // Delete
  const handleRemove = async (id) => {
    await firestore.doc(`cards/${id}`).delete();
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

  // This is the fetch once option
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const snapshot = await firestore.collection('cards').get();
  //     const entries = snapshot.docs.map(collectIdsAndDocs);
  //     setCardCollection(entries);
  //   }

  //   fetchData();
    
  // }, []);

  // streaming, being sure to unsubscribe to avoid memory leaks, I hope...
  useEffect(() => {
      const unsubscribe = firestore.collection('cards').onSnapshot(snapshot => {
        const entries = snapshot.docs.map(collectIdsAndDocs)
        setCardCollection(entries);
      });
      // const entries = snapshot.docs.map(collectIdsAndDocs); 

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
            <CardCollection 
              path="card-collection" 
              cardCollection={cardCollection}
              handleRemove={handleRemove}>
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
            <AddCard path="add-card" handleCreate={handleCreate} />
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