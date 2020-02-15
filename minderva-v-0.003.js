'use strict';

// VERSION 0.004
// - start dom implementation

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
        this.cards.push({uid: id, 'question': q, 'answer': a});
        this._idCount += 1;
        this.displayCards();
    },

    // Delete Card
    deleteCard: function(id) {
        let idx = this.findIndex(id);
        console.log(idx);
        if (idx !== -1) {
            this.cards.splice(idx, 1);
        } else {
            return 'This card id doesn\'t exit';
        }
        this.displayCards();
    },

    // Edit Question
    editQuestion: function(id) {
        let index = this.findIndex(id);
        if (index !== -1) {
            let q = prompt('Enter an updated question');
            this.cards[index]['question'] = q;
        } else {
            return 'Can\'t edit card. This card id doesn\'t exit';
        }
        this.displayCards();
    },

    // Edit Answer
    editAnswer: function(id) {
        let index = this.findIndex(id);
        if (index !== -1) {
            let a = prompt('Enter an updated question');
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
