import React, { useState } from 'react';

import Nav from './components/Nav';
import UserProfile from './components/UserProfile'
import AddCard from './components/AddCard';
import CardCollection from './components/CardCollection';
import Quiz from './components/Quiz';
import EditCard from './components/EditCard';
import { Router } from '@reach/router';
// import './App.css';

function App() {

  // Cards Database
  const cards = [ {
    id: '001',
    front: "What is the capital of New Mexico?",
    back: "Santa Fe"
  },
  {
    id: '002',
    front: "What is the capital of Colorado?",
    back: "Denver"
  },
  {
    id: '003',
    front: "What is the capital of Wyoming?",
    back: "Laramie"
  },
  {
    id: '004',
    front: "What is the capital of California?",
    back: "Sacromento"
  } ]

  // Add Card State
  // I think you may need to rethink this structure to be
  // [cardDetail, setCardDetail] = useState({id: '', front: '', back: ''})
  // but I may save resturcturing this until I have firebase setup...
  const [id, setId] = useState('');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [cardCollection, setCardCollection] = useState(cards);

  // Create
  const handleAdd = (e) => {
    e.preventDefault(); 
    setCardCollection([{
      id:id,
      front:front,
      back:back
    }, ...cardCollection])
  }

  // Delete
  const handleDelete = (e) => {
    e.preventDefault();
    const filterCollection = cardCollection.filter(card => card.id !== e.target.value)
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

  return (
    <div className="App">
      <h1>Minderva - MVP Build 0.03</h1>
      
      <header className="App-header">
        <Nav />

        {/* You may need to restructure state to make alll these props easier to pass */}
         
      </header>
      <div>
      <Router>
        
        <CardCollection path="card-collection" 
        cardCollection={cardCollection}
        handleDelete={handleDelete} 
        handleEdit={handleEdit}
        setId={setId} id={id}
        setBack={setBack} back={back}
        setFront={setFront} front={front}>
          <EditCard path="edit-card" 
                handleAdd={handleEdit}
                setBack={setBack}
                setId={setId}
                setFront={setFront} 
                id={id}
                front={front}
                back={back}/>
        </CardCollection>

        <AddCard path="add-card" handleAdd={handleAdd}
          setBack={setBack} setId={setId} setFront={setFront} 
          id={id} front={front} back={back}/>

        <Quiz path="quiz" />
        
        <UserProfile path="user-profile" />
      
      </Router>
      </div>
    </div>
  );
}

export default App;
