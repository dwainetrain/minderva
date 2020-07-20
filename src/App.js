import React, { useState } from 'react';
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
  const [id, setId] = useState('');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [cardCollection, setCardCollection] = useState(cards)
  
  // TODO: Display card state function

  // Create
  const handleAdd = (e) => {
    e.preventDefault();
    console.log(e)
    console.log('You added something!s')
    setCardCollection([{
      id:id,
      front:front,
      back:back
    }, ...cardCollection])
  }


  const cardsDisplay = Object.keys(cardCollection).map(
    card => 
    <div key={cardCollection[card].id}>
      <h4>{cardCollection[card].front}</h4>
      <h5>{cardCollection[card].back}</h5>
      <h6>{cardCollection[card].id}</h6>
      <hr />
    </div>
  )

  // Update


  // Delete

  return (
    <div className="App">
      <header className="App-header">
        <p>Add a Card</p>
        {/* Controlled component form, takes in the form data into state and then updates database */}
        <form onSubmit={handleAdd}>
          <input 
            type="text" 
            name="id" 
            value={id} 
            onChange={ e => setId(e.target.value) } 
            placeholder="id"
            >
          </input>
          <input 
            type="text" 
            name="front" 
            placeholder="front"
            value={front} 
            onChange={ e => setFront(e.target.value) }
            >
          </input>
          <input 
          type="text" 
          name="back" 
          placeholder="back"
          value={back} 
          onChange={ e => setBack(e.target.value) }
          >
          </input>
          <button>Add Card</button>
        </form>
      </header>
      <div>
        {/* {cardList} */}
        {cardsDisplay}
      </div>
    </div>
  );
}

export default App;
