'use strict';

// THIS VERSION:
// - it should have a display function in cards object - k
// - it should have an idCount in cards object - k (note)
// - it should have an add card method in Cards object - k
// - it should have a delete card method in Cards object - k
// - it should have an edit card method in Cards object - k
// - it should have a quiz method in Cards object -k

// SOMEDAY MAYBE:
// - it should keep track of right and wrong answers
// - it should display results at end of session
// - it should provide answer validation

/* Cards Object */
// NOTE: Find some way to protect the idCount number
// research ways to make the property private

let flashCards = {

    // Unique Card Id
    _idCount: 3,

    // Card Collection (contains sample data)
    // Structure: {uid: int, 'question: string, 'answer': string}
    cards: [
        {uid: 0, 'question': 'What is New Mexico\'s Capital?', 'answer': 'Santa Fe'},
        {uid: 1, 'question': 'What is Colorado\'s Capital?', 'answer': 'Denver'},
        {uid: 2, 'question': 'What is Wyoming\'s Capital?', 'answer': 'Chyenne'},
        {uid: 7, 'question': 'What is Britain\'s Capital?', 'answer': 'London'},
    ],

    // Display card collection
    displayCards: function() {
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

    // Edit Card
    editCard: function(id) {
        let index = this.findIndex(id);
        if (index !== -1) {
            let q = prompt('Enter an updated question');
            let a = prompt('Enter an updated answer.');
            this.cards[index] = {uid: id, 'question': q, 'answer': a};
        } else {
            return 'This card id doesn\'t exit';
        }
        this.displayCards();
    },

    quiz: function() {
        for (let card of Object.keys(this.cards)) {
            prompt(this.cards[card]['question']);
            prompt(`The answer is ${this.cards[card]['answer']}. Were you correct? `)
        }
    },
}