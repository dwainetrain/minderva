'use strict';

class Model {
    constructor( ){
        // Unique Card Id
        this._idCount = 8

        // Card Collection (contains sample data)
        // Structure: {uid: int, 'question: string, 'answer': string, 'correct': int, 'incorrect': int}
        this.cards = [
            {uid: 0, 'question': 'What is New Mexico\'s Capital?', 'answer': 'Santa Fe', 'correct': 0, 'incorrect': 0},
            {uid: 1, 'question': 'What is Colorado\'s Capital?', 'answer': 'Denver', 'correct': 1, 'incorrect': 1},
            {uid: 2, 'question': 'What is Wyoming\'s Capital?', 'answer': 'Chyenne', 'correct': 2, 'incorrect': 5},
            {uid: 7, 'question': 'What is Britain\'s Capital?', 'answer': 'London', 'correct': 3, 'incorrect': 1},
        ]
    }

    // Display card collection - only useful for console debugging now
    displayCards() {
        if (this.cards.length === 0) {
            console.log('Your study deck is empty')
        }

        for (let card of this.cards) {
            console.log(card);
        }
    }

    // Get current Id
    currentId() {
        return this._idCount;
    }

    // Find index based on id of card
    findIndex(id) {
        return this.cards.findIndex( ({uid}) => uid === id);
    }

    // Add Card
    addCard(q, a) {
        const id = this.currentId();
        this.cards.push({uid: id, 'question': q, 'answer': a, 'correct': 0, 'incorrect': 0});
        this._idCount += 1;
        this.displayCards(); // Only for Testing Model
    }

    // Delete Card
    deleteCard(id) {
        let idx = this.findIndex(id);
        if (idx !== -1) {
            this.cards.splice(idx, 1);
        } else {
            return 'This card id doesn\'t exit';
        }
        this.displayCards(); // Only for Testing Model
    }

    // Edit Question
    editQuestion(id, q) {
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
        this.displayCards(); // Only for Testing Model
    }

    // Edit Answer
    editAnswer(id,a) {
        let index = this.findIndex(id);
        
        if (a === '') {
            return;
        }

        if (index !== -1) {
            this.cards[index]['answer'] = a;
        } else {
            return 'Can\'t edit card. This card id doesn\'t exist';
        }
        this.displayCards(); // Only for Testing Model
    }

    // To keep seperation clear, shouldn't the tally function be in here?
    // You could just rewrite the whole entry, and include the updated tally
    // in the rewrite (ie, just use editCard)
}

class View{
    constructor(){}

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) {
            element.classList.add(className)
        }

        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }
}

class Controller{
    constructor(model, view){
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View())
