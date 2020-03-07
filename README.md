
# Minderva

A modern spaced-repetition-system (SRS) for knowledge retention.

##### Current Design
[Link to Current Figma Design (WIP)](https://www.figma.com/file/1172J1ZkHdxIk26jtRmoye/minderva?node-id=1%3A2)

##### VERSION 0.006 (WIP)
- CURRENT GOAL: Create current version of app in React
- 
Notes:

- Perhaps a validate input function that I can easily apply to any form field

  

SOMEDAY MAYBE:

- it should provide answer validation for typed in answers
  

### Version History 

##### VERSION 0.005

- Core flashcard functionality is there, now the goals are:

- MAKE SORTA PRETTY(leads to SPA)

- STORE DATA(leads to SRS Algo)

- IMPROVED VALIDATION (leads to less bugs)

- REFACTOR AS MVC (leads to better readability/editability)
- IMPLEMENT TESTING (leads to better complexity management)
  
- [x] it should be refactored into MVC pattern
- [x] utilize event delegation for edit and delete buttons
- [x] it should have the option to indicate a in/correct answer and tally answer
- [x] it should show an error if a card doesn't exist for edit or delete (NA)
- [x] display cards should use the display method? (the method is now obsolete, refactor logic)
- [x] remove quiz from flashcard object

##### VERSION 0.004

- [x] it should allow adding cards via page - ok

- [x] it should allow deleting cards via page - ok

- [x] it should show all cards - ok

- [x] it should have allow editing of a card on page - ok

- [x] it should show card collection state after adding a card - k

- [x] it should show card collection state after deleting a card - k

- [x] it should show card collection state after editing a card - k

- [x] it should ignore editing answer or question if either are left blank - k

- [x] it should open the quiz via page - k

- [x] it should display cards in a table - k

- [x] it should show a single question - k

- [x] it should 'flip' to show the answer - k

- [x] it should have a button to go to the next card - k

  

##### VERSION 0.003:

- [x] it should keep track of right and wrong answers for eventual Spaced System (just a tally for now?) - k

- [x] Question and Answer editing logic should be seperate methods - k

  

##### VERSION 0.002:

- [x] it should have a display function in cards object - k

- [x] it should have an idCount in cards object - k (note)

- [x] it should have an add card method in Cards object - k

- [x] it should have a delete card method in Cards object - k

- [x] it should have an edit card method in Cards object - k

- [x] it should have a quiz method in Cards object -k

  

##### VERSION 0.001

- [x] it should show the question - k

- [x] it should accept input from user to show answer - k

- [x] it should show the answer - k

- [x] it should allow to add more questions/answer pairs - k

- [x] it should allow to edit cards - k

- [x] it should allow to delete cards - k