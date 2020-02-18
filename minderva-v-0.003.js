'use strict';

// Don't forget the debugger;

// VERSION 0.004
// - it should allow adding cards via page - ok
// - it should allow deleting cards via page - ok
// - it should show all cards - ok
// - it should have allow editing of a card on page - ok
// - it should show an error if a card doesn't exist for edit or delete
// - display cards should use the display method? (the method is now obsolete?)
// - it should show card collection state after adding a card - k
// - it should show card collection state after deleting a card - k
// - it should show card collection state after editing a card - k
// - it should ignore editing answer or question if either are left blank
// - it should open the quiz via page - k
// - it should display cards in a table - k


// DOM Process
// Get element, html should have an id, 
// 

// SOMEDAY MAYBE:
// - it should provide answer validation for typed in answers
// - could you use the nature of arrays and delete to maintain a private index?


/* Cards Object */
// NOTE: Find some way to protect the idCount number
// research ways to make the property private

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

    // Display card collection
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

    // Apply current id to new card, create card, display cards
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
        this.displayCards();
    },

    // Edit Question
    editQuestion: function(id, q) {
        let index = this.findIndex(id);
        if (index !== -1) {
            // let q = prompt('Enter an updated question');
            this.cards[index]['question'] = q;
        } else {
            return 'Can\'t edit card. This card id doesn\'t exit';
        }
        this.displayCards();
    },

    // Edit Answer
    editAnswer: function(id,a ) {
        let index = this.findIndex(id);
        if (index !== -1) {
            // let a = prompt('Enter an updated question');
            this.cards[index]['answer'] = a;
        } else {
            return 'Can\'t edit card. This card id doesn\'t exit';
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

let displayTableButton = document.querySelector('#display-table');
displayTableButton.addEventListener('click', function() {
    return displayTable();
})


// Display Cards as a table in HTML (rude)
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

    // Insert data
    for (let card of flashCards.cards) {
        console.log(card);
        let tr = document.createElement('tr')
        for (let data of Object.values(card)) {
            let td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = data;
        }
        tbody.appendChild(tr);
    }
    
}




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

// Delete a Card (rude)
let deleteCardButton = document.querySelector('#deleteCard');
deleteCardButton.addEventListener('click', function() {
    let cardId = document.querySelector('#deleteCardId').valueAsNumber;
    flashCards.deleteCard(cardId);
    document.querySelector('#deleteCardId').value = '';
    displayTable();
})

// Quiz
let quizButton = document.querySelector('#quiz');
quizButton.addEventListener('click', function () {
    flashCards.quiz();
})

// Quiz

/* Version History */
// VERSION 0.003:
// - it should keep track of right and wrong answers for eventual Spaced System (just a tally for now?) - k
// - Question and Answer editing logic should be seperate methods - k

// VERSION 0.002:
// - it should have a display function in cards object - k
// - it should have an idCount in cards object - k (note)
// - it should have an add card method in Cards object - k
// - it should have a delete card method in Cards object - k
// - it should have an edit card method in Cards object - k
// - it should have a quiz method in Cards object -k

// VERSION 0.001
// - it should show the question - k
// - it should accept input from user to show answer - k
// - it should show the answer - k
// - it should allow to add more questions/answer pairs - k
// - it should allow to edit cards - k
// - it should allow to delete cards - k