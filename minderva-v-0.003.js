'use strict';

/* Cards Object */
let flashCards = {

    // Unique Card Id
    _idCount: 8,

    // Card Collection (contains sample data)
    // Structure: {uid: int, 'question: string, 'answer': string, 'correct': int, 'incorrect': int}
    cards: [
        {uid: 0, 'question': 'What is New Mexico\'s Capital?', 'answer': 'Santa Fe', 'correct': 0, 'incorrect': 0},
        {uid: 1, 'question': 'What is Colorado\'s Capital?', 'answer': 'Denver', 'correct': 1, 'incorrect': 1},
        {uid: 2, 'question': 'What is Wyoming\'s Capital?', 'answer': 'Chyenne', 'correct': 2, 'incorrect': 5},
        {uid: 7, 'question': 'What is Britain\'s Capital?', 'answer': 'London', 'correct': 3, 'incorrect': 1},
    ],

    // Display card collection - only useful for console debugging now
    displayCards: function() {
        if (this.cards.length === 0) {
            console.log('Your study deck is empty')
        }

        for (let card of this.cards) {
            console.log(card);
        }
    },

    // Get current Id
    currentId: function() {
        return this._idCount;
    },

    // Find index based on id of card
    findIndex: function(id) {
        return this.cards.findIndex( ({uid}) => uid === id);
    },

    // Add Card
    addCard: function (q, a) {
        const id = this.currentId();
        this.cards.push({uid: id, 'question': q, 'answer': a, 'correct': 0, 'incorrect': 0});
        this._idCount += 1;
        this.displayCards();
    },

    // Delete Card
    deleteCard: function(id) {
        let idx = this.findIndex(id);
        if (idx !== -1) {
            this.cards.splice(idx, 1);
        } else {
            return 'This card id doesn\'t exit';
        }
        displayTable();
    },

    // Edit Question
    editQuestion: function(id, q) {
        let index = this.findIndex(id);
        
        if (q === '') {
            return;
        }

        if (index !== -1) {
            // let q = prompt('Enter an updated question');
            this.cards[index]['question'] = q;
        } else {
            return 'Can\'t edit card. This card id doesn\'t exist';
        }
        this.displayCards();
    },

    // Edit Answer
    editAnswer: function(id,a ) {
        let index = this.findIndex(id);
        
        if (a === '') {
            return;
        }

        if (index !== -1) {
            // let a = prompt('Enter an updated question');
            this.cards[index]['answer'] = a;
        } else {
            return 'Can\'t edit card. This card id doesn\'t exist';
        }
        this.displayCards();
    },

    // Card Quiz
    quiz: function() {
        for (let card of Object.keys(this.cards)) {

            prompt(this.cards[card]['question']);
            
            let response = prompt(`The answer is ${this.cards[card]['answer']}. Were you correct?
            Please type 'y' for yes or 'n' for no.`)
            let correct = response.toLowerCase();
            
            if (correct === 'y') {
                this.cards[card]['correct'] += 1;
            } else if (correct === 'n') {
                this.cards[card]['incorrect'] += 1;
            } else {
                prompt('Invalid input, please try again')
                // Very rudimentary validation at this stage
            }
        }
    },
}

// HTML Handling


// Display Cards as a table in HTML (rude)
// TODO Should I convert this to a view object?
// TODO Can you refactor with Array.map?
let displayTableButton = document.querySelector('#display-table');
displayTableButton.addEventListener('click', function() {
    return displayTable();
})

function displayTable() { 
    let cardTable = document.querySelector('#card-table');
    cardTable.innerHTML = '';

    if (flashCards.cards.length === 0) {
        let div = document.createElement('div')
        cardTable.innerHTML = 'Your study deck is empty';
    }

    // Build a table

    // Build the heading
    let table = document.createElement('table')
    cardTable.appendChild(table);

    let thead = document.createElement('thead')
    table.appendChild(thead);

    // Also create body
    let tbody = document.createElement('tbody')
    table.appendChild(tbody);

    let theadtr = document.createElement('tr');
    thead.appendChild(theadtr);

    for (let heading of Object.keys(flashCards.cards[0])) {
        let th = document.createElement('th')
        theadtr.appendChild(th)
        th.innerHTML = heading;
    }

    // Create Delete Column
    let thDelete = document.createElement('th');
    theadtr.appendChild(thDelete);
    thDelete.innerHTML = 'Delete';

    // Insert data and delete functions
    for (let card of flashCards.cards) {

        let tr = document.createElement('tr')
        for (let data of Object.values(card)) {
            let td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = data;
        }

        // Delete button
        let tdDelete = document.createElement('td');
        let tdDeleteButton = document.createElement('button');
        tr.appendChild(tdDelete)
        tdDelete.appendChild(tdDeleteButton)
        tdDeleteButton.innerHTML = 'Delete'
        tdDeleteButton.addEventListener('click', function() {
            flashCards.deleteCard(card['uid'])
        })

        tbody.appendChild(tr);
    }
    
}

// TODO Should I create a handler object with these methods?

// Add a Card (rude)
let addCardButton = document.querySelector('#addCard');
addCardButton.addEventListener('click', function() {

    let addQuestion = document.querySelector('#addQuestion').value;
    let addAnswer = document.querySelector('#addAnswer').value;
    
    flashCards.addCard(addQuestion, addAnswer);
    
    document.querySelector('#addQuestion').value = '';
    document.querySelector('#addAnswer').value = '';
    
    displayTable();
})

// Edit a Card (rude)
let editCardButton = document.querySelector('#editCard');
editCardButton.addEventListener('click', function() {

    let cardId = document.querySelector('#editCardId').valueAsNumber;
    let editedQuestion = document.querySelector('#editQuestion').value;
    let editedAnswer = document.querySelector('#editAnswer').value;

    flashCards.editQuestion(cardId, editedQuestion);
    flashCards.editAnswer(cardId, editedAnswer);
    
    document.querySelector('#editQuestion').value = '';
    document.querySelector('#editAnswer').value = '';
    document.querySelector('#editCardId').value = '';
    
    displayTable();
})


// Quiz
// Well, it works, but could it be clearer?
// Basically it's a kind of recursive quiz
// using the counter to keep calling the quiz function
// with a new value
// which will work for a deck of any length
// needs refactoring

let quizButton = document.querySelector('#quiz');
quizButton.addEventListener('click', function () {
    quiz(0);
})

let quizCanvas = document.querySelector('#quiz-canvas');

// Start Quiz
function quiz(counter) {
    
    let availableCards = [...flashCards.cards];

    if (counter < availableCards.length) {
        let cardCounter = counter;
        quizCanvas.innerHTML = '';
    
        let div = document.createElement('div');
        div.innerHTML = showCardFront(availableCards[cardCounter])
        quizCanvas.appendChild(div);

        let flipButton = document.querySelector('#flip-button');
        flipButton.addEventListener('click', function() {
            div.innerHTML = showCardBack(availableCards[cardCounter])
            quizCanvas.appendChild(div);
            getNextCard(cardCounter);
        })
    } else {
        let div = document.createElement('div')
        quizCanvas.innerHTML = 'Quiz Complete';
    }

    function getNextCard(counter) {
        counter += 1;
        let nextCardButton = document.querySelector('#next-card');
        nextCardButton.addEventListener('click', function() {
            quiz(counter);
        })
    
    };

    function showCardFront(card) {
        const cardFront = `
            <p>${card['question']}</p>
            <button id="flip-button">Flip</button>
        `
        return cardFront;
    }
    
    function showCardBack(card) {
        const cardBack = `
            <p>${card['answer']}</p>
            <button id="next-card">Continue</button>
        `
        return cardBack;
    }

    
    
    // Getting correct and incorrect responses
    
    // let response = prompt(`The answer is ${this.cards[card]['answer']}. Were you correct?
    // Please type 'y' for yes or 'n' for no.`)
    // let correct = response.toLowerCase();
    
    // if (correct === 'y') {
    //     this.cards[card]['correct'] += 1;
    // } else if (correct === 'n') {
    //     this.cards[card]['incorrect'] += 1;
    // } else {
    //     prompt('Invalid input, please try again')
    //     // Very rudimentary validation at this stage
    // }
// }
}