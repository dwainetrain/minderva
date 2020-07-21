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


  // Read
  const cardsDisplay = Object.keys(cardCollection).map(
    card => 
    <div key={cardCollection[card].id}>
      <h4>Front: {cardCollection[card].front}</h4>
      <h5>Back: {cardCollection[card].back}</h5>
      <h6>ID: {cardCollection[card].id}</h6>
      <hr />
    </div>
  )

  


  

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

        <div>
          <h5>Delete a card</h5>
          <form onSubmit={handleDelete}>
            <input 
              type="text" 
              name="id" 
              value={id} 
              onChange={ e => setId(e.target.value) } 
              placeholder="id"
              >
            </input>
          
            <button>Delete Card</button>
          </form>

            <p>Edit a Card</p>
            {/* Controlled component form, takes in the form data into state and then updates database */}
            <form onSubmit={handleEdit}>
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
              <button>Edit Card</button>
            </form>
          </div>
      </header>
      <div>
        {/* {cardList} */}
        {cardsDisplay}
      </div>
    </div>
  );
}

export default App;
