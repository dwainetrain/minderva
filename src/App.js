import React, { useState } from 'react';
import DisplayCards from './components/DisplayCards';
import AddCard from './components/AddCard';
import DeleteCard from './components/DeleteCard';
import EditCard from './components/EditCard';
import Quiz from './components/Quiz';
import { Link, Router } from '@reach/router';
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
    const filterCollection = cardCollection.filter(card => card.id !== id)
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
      <h1>Reach Router Tests</h1>
      <nav>
        <Link to ="/">Home</Link>{" "}
        <Link to="card-collection">Display Cards</Link>
      </nav>
      <Router>
        <DisplayCards path="card-collection" cardCollection={cardCollection}/>
      </Router>
      <header className="App-header">

        {/* You may need to restructure state to make alll these props easier to pass */}
        
        <AddCard handleAdd={handleAdd}
          setBack={setBack} setId={setId} setFront={setFront} 
          id={id} front={front} back={back}/>

        <DeleteCard handleDelete={handleDelete} setId={setId} id={id}/>

        <EditCard handleEdit={handleEdit}
          setBack={setBack} setId={setId} setFront={setFront} 
          id={id} front={front} back={back}/>
          
      </header>
      <div>
        
      </div>
    </div>
  );
}

export default App;
