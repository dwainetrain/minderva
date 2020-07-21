import React from 'react';

// It works, but there's got to be an easier way of passing all this info...
const AddCard = ({ handleAdd, setId, setFront, setBack, id, front, back }) => (
        <div>
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
        </div>
    )

export default AddCard;