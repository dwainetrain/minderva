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
        this.form.id = 'add-card'

        // Add a card to the collection (inputs)
        this.addQuestionInput = this.createElement('input')
        this.addQuestionInput.name = 'addQuestion'
        this.addQuestionInput.type = 'text'
        this.addQuestionInput.placeholder = 'Add Question'

        this.addAnswerInput = this.createElement('input')
        this.addAnswerInput.name = 'addAnswer'
        this.addAnswerInput.type = 'text'
        this.addAnswerInput.placeholder = 'Add Answer'

        this.addCardButton = this.createElement('button')
        this.addCardButton.textContent = "Add Card"
        this.addCardButton.type = 'submit'

        // append input and button to form
        this.form.append(this.addQuestionInput, this.addAnswerInput, this.addCardButton)

        // append other title, heading and form to app
        this.app.append(this.title, this.form)

        // DISPLAY CARDS BUTTON
        this.displayTableButton = this.createElement('button')
        this.displayTableButton.id = 'display-table'
        this.displayTableButton.textContent = 'Display Cards'
        this.app.append(this.displayTableButton)

    }

    

    displayTable(cards) {
      
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
        
                // Delete button
                this.tdDelete = document.createElement('td');
                this.tdDeleteButton = document.createElement('button');
                this.tr.appendChild(this.tdDelete)
                this.tdDelete.appendChild(this.tdDeleteButton)
                this.tdDeleteButton.className = 'delete'
                this.tdDeleteButton.setAttribute('data-uid', card['uid'])
                this.tdDeleteButton.innerHTML = 'Delete'
                
        
                // Edit button
                this.tdEdit = document.createElement('td');
                this.tdEditButton = document.createElement('button');
                this.tr.appendChild(this.tdEdit)
                this.tdEdit.appendChild(this.tdEditButton)
                this.tdEditButton.className = 'edit'
                this.tdEditButton.setAttribute('data-uid', card['uid'])
                this.tdEditButton.innerHTML = 'Edit'
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

    // Getters and Setters for input

    get _inputText() {
        return [this.addQuestionInput.value, this.addAnswerInput.value]
    }

    get _editText() {
        console.log( [this.editQuestionInput.value, this.editAnswerInput.value] );
    }


    _resetInput() {
        this.addQuestionInput.value = ''
        this.addAnswerInput.value = ''
    }

    // Event Handling
    bindAddCard(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault()

            if (this._inputText) {
                handler(this._inputText)
                this._resetInput()
            }
        })
    }

    

    bindOpenEditCard(handler) {
        
        document.addEventListener('click', function(event) {
                if (event.target.className === 'edit') {
                    const uid = parseInt(event.target.dataset.uid)
                    handler(uid)
                }
                
                })
    }

    bindEditCard(handler) {
        
        document.addEventListener('click', function(event) {
                if (event.target.className === 'edit-submit') {
                    event.preventDefault()

                    const uid = parseInt(event.target.dataset.uid)
                    console.log(uid, this._editText)
                    handler(uid, this._editText)
                }
                
                })
    }

    bindDeleteCard(handler) {
        document.addEventListener('click', function(event) {
                if (event.target.className === 'delete') {
                    const uid = parseInt(event.target.dataset.uid)
                    handler(uid)
                }
                
                })
    }

    displayEdit(id) {

        // Somehow display the card's original text about edit fields...

        // Card Edit Form
        this.editForm = this.createElement('form')
        this.editForm.id = 'edit-card'

        this.editQuestionInput = this.createElement('input')
        this.editQuestionInput.name = 'editQuestion'
        this.editQuestionInput.type = 'text'
        this.editQuestionInput.placeholder = 'Edit Question'

        this.editAnswerInput = this.createElement('input')
        this.editAnswerInput.name = 'editAnswer'
        this.editAnswerInput.type = 'text'
        this.editAnswerInput.placeholder = 'Edit Answer'

        this.editCardButton = this.createElement('button')
        this.editCardButton.textContent = "Edit Card"
        this.editCardButton.setAttribute('data-uid', id)
        this.editCardButton.type = 'submit'
        this.editCardButton.className = 'edit-submit'
             

        // append input and button to form
        this.editForm.append(this.editQuestionInput, this.editAnswerInput, this.editCardButton)

        // append other title, heading and form to app
        this.app.append(this.editForm)
    
        //         let editedQuestion = document.querySelector('#editQuestion').value;
        //         let editedAnswer = document.querySelector('#editAnswer').value;

        //         flashCards.editQuestion(card['uid'], editedQuestion);
        //         flashCards.editAnswer(card['uid'], editedAnswer);
                
        //         document.querySelector('#editQuestion').value = '';
        //         document.querySelector('#editAnswer').value = '';
                
        //         displayTable();
        //     })
        // })
    }

    bindDisplayTable(handler) {
        this.displayTableButton.addEventListener('click', function() {
            handler()
        })
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
        this.cards = this.model.cards
        this.view.bindAddCard(this.handleAddCard)
        this.view.bindDisplayTable(this.handleRenderCardTable)
        this.view.bindDeleteCard(this.handleDeleteCard)
        this.view.bindOpenEditCard(this.handleOpenEditCard)
        this.view.bindEditCard(this.handleEditCard)

    }

    handleRenderCardTable = () => {
        this.view.displayTable(this.cards)
    }

    handleAddCard = questionAnswerArray => {
        this.model.addCard(...questionAnswerArray)
        this.handleRenderCardTable()
    }

    handleOpenEditCard = (id) => {
        this.view.displayEdit(id)
    }

    handleEditCard = (id, questionAnswerArray) => {
        console.log(id, questionAnswerArray)
        // this.model.editQuestion(id, questionAnswerArray[0])
        // this.model.editAnswer(id, questionAnswerArray[1])
    }

    handleDeleteCard = (id) => {
        this.model.deleteCard(id)
        this.handleRenderCardTable()
    }

    
}

const app = new Controller(new Model(), new View())
