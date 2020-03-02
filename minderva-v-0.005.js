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
    constructor(){
        // root element
        this.app = this.getElement('#app')

        // app title
        this.title = this.createElement('h1')
        this.title.textContent = 'Minderva: A Modern Learning Tool'

        // Card Creation Form
        this.form = this.createElement('form')

        // Add a card to the collection (inputs)
        this.addQuestionInput = this.createElement('input')
        this.addQuestionInput.name = 'addQuestion'
        this.addQuestionInput.type = 'text'
        this.addQuestionInput.placeholder = 'Add Question'

        this.addCardButton = this.createElement('button')
        this.addCardButton.textContent = "Add Card"

        this.addAnswerInput = this.createElement('input')
        this.addAnswerInput.name = 'addAnswer'
        this.addAnswerInput.type = 'text'
        this.addAnswerInput.placeholder = 'Add Answer'

        this.addCardButton = this.createElement('button')
        this.addCardButton.textContent = "Add Card"

        // append input and button to form
        this.form.append(this.addQuestionInput, this.addAnswerInput, this.addCardButton)

        // append other title, heading and form to app
        this.app.append(this.title, this.form)

    }

    // Getters and Setters for input

    get _questionText() {
        return this.input.value
    }

    _resetInput() {
        this.input.value = '';
    }

    displayTable(cards) {
        // let displayTableButton = this.getElement('#display-table');
        // displayTableButton.addEventListener('click', function() {
        //     return displayCardTable();
        // })
            this.cardTable = this.getElement('#card-table');
            this.cardTable.innerHTML = '';

            if (cards.length === 0) {
                this.div = this.createElement('div')
                this.cardTable.innerHTML = 'Your study deck is empty';
            }

            // Build a table

            // Build the heading
            this.table = this.createElement('table')
            this.cardTable.appendChild(this.table);

            this.thead = this.createElement('thead')
            this.table.appendChild(this.thead);

            // Also create body
            this.tbody = this.createElement('tbody')
            this.table.appendChild(this.tbody);

            this.theadtr = this.createElement('tr');
            this.thead.appendChild(this.theadtr);

            for (let heading of Object.keys(cards[0])) {
                this.th = this.createElement('th')
                this.theadtr.appendChild(this.th)
                this.th.innerHTML = heading;
            }

            // Create Delete Column
            this.thDelete = this.createElement('th');
            this.theadtr.appendChild(this.thDelete);
            this.thDelete.innerHTML = 'Delete';

            // Create Edit Column
            this.thEdit = this.createElement('th');
            this.theadtr.appendChild(this.thEdit);
            this.thEdit.innerHTML = 'Edit';

            for (let card of cards) {

                this.tr = this.createElement('tr')
                for (let data of Object.values(card)) {
                    this.td = document.createElement('td');
                    this.tr.appendChild(this.td);
                    this.td.innerHTML = data;
                }
        
                // // Delete button
                // let tdDelete = document.createElement('td');
                // let tdDeleteButton = document.createElement('button');
                // tr.appendChild(tdDelete)
                // tdDelete.appendChild(tdDeleteButton)
                // tdDeleteButton.innerHTML = 'Delete'
                // tdDeleteButton.addEventListener('click', function() {
                //     flashCards.deleteCard(card['uid'])
                // })
        
                // // Edit button
                // let tdEdit = document.createElement('td');
                // let tdEditButton = document.createElement('button');
                // tr.appendChild(tdEdit)
                // tdEdit.appendChild(tdEditButton)
                // tdEditButton.innerHTML = 'Edit'
                // tdEditButton.addEventListener('click', function() {
                    
                //     const editFields = `
                //             <input id="editQuestion" type="text" placeholder="Edit Question">
                //             <input id="editAnswer" type="text" placeholder="Edit Answer">
                //             <button id="editCard">Edit Card</button>
                //     `
                //     let editDiv = document.createElement('div');
                //     cardTable.appendChild(editDiv);
                //     editDiv.innerHTML = editFields;
        
                //     let editCardButton = document.querySelector('#editCard');
                //     editCardButton.addEventListener('click', function() {
                //         let editedQuestion = document.querySelector('#editQuestion').value;
                //         let editedAnswer = document.querySelector('#editAnswer').value;
        
                //         flashCards.editQuestion(card['uid'], editedQuestion);
                //         flashCards.editAnswer(card['uid'], editedAnswer);
                        
                //         document.querySelector('#editQuestion').value = '';
                //         document.querySelector('#editAnswer').value = '';
                        
                //         displayTable();
                //     })
                // })
        
                this.tbody.appendChild(this.tr);
            }
    }

    // html get and create elements
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

        this.renderCardTable(this.model.cards)
    }

    renderCardTable = cards => {
        this.view.displayTable(cards)
    }
}

const app = new Controller(new Model(), new View())
