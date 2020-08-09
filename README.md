## Minderva

Minderva is a opinionated language learning tool. It's merely a baby right now.

### Version History

**Focus over Features**

Version 0.01, 7.20.2020, 7.21.2020:

- ~~It should display cards~~
- ~~It should add to cards~~
- ~~It should delete cards~~
- ~~It should edit cards~~

Notes:

- ~~When should the form become a [controlled component](https://reactjs.org/docs/forms.html)? Right now!~~
- ~~Store add from values first in state and then add to card database? all controlled by state for now~~

Version 0.02, 7.21.2020:

- ~~Display cards split into component~~
- ~~Add Card Split into component~~
- ~~Edit Card Split into component~~
- ~~Delete Card Split into component~~
- ~~It should have a non-functioning Quiz component~~

Version 0.03, 7.21.2020, 7.22.2020:

- ~~It should have a Home - Dashboard Page~~
- ~~It should have an Add Cards Page~~
- ~~It should have a Cards Collection Page~~
- ~~It should have a Quiz Page~~
- ~~It should have a Basic User Profile Page~~
- ~~It should have navigation split into a separate component~~
- ~~It should have a delete button next to each card in collection~~
- ~~It should have an edit button next to each card in the collection~~
- ~~It should go to a page to edit the card if the edit button is pressed~~
- ~~It should delete the card if delete is pressed~~

Version 0.04, 7.23.2020, 7.24.2020, 7.25.2020, 7.26.2020:

- ~~It should change from Reach Router to React Router (didn't notice that React Router is updated with features from Reach Router)~~
- ~~It should connect to firebase~~
- ~~It should add a card to the database~~
- ~~It should delete a card from the database~~
- ~~It should allow editing of a card in the database~~
- ~~it should subscribe to database changes~~

Version 0.05, 7.26.2020, 7.27.2020, 7.28.2020:

- ~~It should pull translations from the Google API~~
- ~~It should have the ability to enter a word and have it translated into another language~~
- ~~It should allow you to select translate 'to' languages~~
- ~~It should allow you to select translate 'from' languages~~
- ~~It should have names, not just codes, for languages~~
- ~~It should have the ability to save the word and translation to the firebase database~~

Version 0.06, 7.28.2020:

- ~~It should have a working quiz section~~

Version 0.07:

- ~~It should allow users to sign-up/sign-in with Google Account~~
- ~~It should allow users to sign out~~
- ~~It shoud allow users to view their card collection~~
- ~~It should allow users to add cards to their collection~~
- ~~It should allow users to delete cards from their collection~~
- ~~It should allow user to edit cards in their collection~~
- ~~It should allow users to quiz on cards in their collection~~

Notes:

- Data Structure: Going for the simplest form, collection:users -> document:user -> collection:cards -> document:card

Version 0.08:

- First UX Pass:
- ~~Overall: Remove the profile that's on every page, and just put it on user profile page for now~~
- ~~Homepage: If user is logged in, they should get main navigation, otherwise they should only see login/signup.~~
- ~~Navigation: A sign out link should be provided if the user is logged in~~
- ~~Display Cards: Cards should be shown in a table, with edit and delete buttons beside them~~
- ~~Display Cards: Rename link to Card Collection~~
- ~~Display Cards: The page should refresh if the users signs in or out.~~
- ~~Security: Are the paths blocked if the user is logged out? ie, the add card route?~~
- ~~Edit Card: The page should flash message on edit.~~
- ~~Edit card: After editing, it should return to card collection~~
- ~~Edit card: There should be a 'back to card collection" button, or cancel button~~
- ~~Edit Card: The routing bug should be fixed (Tricky! Learn about subpage. )~~
- ~~Delete Card: A confirmation alert should pop up~~
- ~~Delete Card: A status message should flash in~~
- ~~Add Card: It should flash a status message on add~~
- ~~Quiz Page: It should show the number of cards in the quiz, and what number you are on.~~
- ~~Quiz Page: It should show whether you are on the front or back of a card~~
- ~~Quiz Page: At the end of the quiz, it should show a congratulations message~~
- ~~Quiz Page: The cards should be reviewed in random order~~
- ~~User Profile: It should show the actual user profile~~
- ~~User Profile: It should remove the date element, that's just the current time~~
- ~~Overall: It should have a 404 page.~~

**Version 0.09:**

1st Data Integrity and Security Audit Pass

- Dashboard if you're not logged in, you get this error: Error in onSnapshot: FirebaseError: Missing or insufficient permissions. Meaning it's trying to pull from the database before verifying that a user is logged in. It should first check user, and only if user, then database functions.
- Add Card, Edit Card: It should have limit on the amount of characters you can translate per card.
- You should disconnect from the internet and apis and see how they handle failing, this is a way to start tackling all the error handling that needs to take place
- It should have protected api keys so you can deploy it (implement through Cloud Functions?)
- See other security considerations in your notes
- ~~Either the front-end or the database to make sure that the front and back of the cards are not null. BOTH~~

Overall Notes:

- Roadmap to Version 1.0: ~~Firebase CRUD~~ → ~~Basic Quiz~~ → ~~Basic User Functions~~ → ~~First UX Pass~~ → Data Integrity and Security Audit Pass -> 1st Visual Design Pass (Material UI - design in figma, implement in React Material UI package, see here (https://material-ui.com/getting-started/installation/ && https://material.io/resources) ) -> Revisit UX -> Refine Visual -> Get feedback from users and hackers -> Review and implement notes on usability, accessibility and security
- Review useEffect in depth, the components are all calling things 4 or more times, this may have to do with how you're sending props. If you send props that are updated in state, that will trickle down and rerender them. I think...check out anti-patterns to see if one of those is causing this.
- ~~Currently in Test Mode!~~
- If you Build, your API Keys will be exposed! Don't forget to secure them somehow
- git ignore firebase.js for the time being, until I find a better way to sercure my api
- ~~Router Bug - When in Edit Page, if you click card collection it goes to root/edit-card/card-collection, whereas it should just go back to root/card-collection~~
- Quiz Bug - It doesn't stop when you reach the end of the cards, it just keeps saying loading if you click next card...
- The Google Sign in with Pop up is giving a cross-site resource warning
- At some point, disconnect from the internet and see how the app behaves, it needs to gracefully fail.
- Set a character limit in the front card, mainly so someone doesn't go an past a whole novel and burn through your Translator api limit. So, short phrases and sentences okay, anything past that, nope...
- The page is not refreshing on user sign in or sign out
- My current map of language to code is static, and causes lots of issues with name sorting, and localized names for languages, this should be addressed in a later version
- The site shouldn't try to pull in data unless a user is logged in, see error on homepage. It's trying to pull from the database without verifying that the user is logged in first...
- I would like to store the available languages in the database, and only refresh them once a month with cloud functions. Otherwise just select the ones that are available now and call it good.

Future Version Considerations:

- KEY FEATURE: It should use the [Forvo Api](https://api.forvo.com/documentation/word-pronunciations/) to add pronunciations (up to 500 a day)
- KEY FEATURE TO ADD: Add pronunciation with Google TTS
- User Profile: User should be able to select default to and from languages

* Edit Page: Add translation api to screen
* The sign in and sign up pages should be seperate
* Add Card: It should have a little better seperation of functions (ie, translate not right next to add card) (visual pass)
* Add Card: It should have the option to study the reverse(? maybe)
* Add Card: Better organization of languages
* Add Card: It should add the created date to the database (for SRS algorithm)
* Delete Card: consider flash message with undo function (like gmail undo)
* Quiz Page: It should have better seperation of flip card from next card
* Should it have a translate button in the edit screen?
* Allow users to sign-in/sign-up with other services, especially email (See FEM video starting at 31)
* It should be moved to its own github location (wait until final is graded)
* It should have the five most popular languages up top of language selection
* It should have the users most frequently used languages up top of language selection
* It should give native language equivalent pronunciation guides. [Start Here](https://easypronunciation.com/en/english-phonetic-transcription-converter) or with International Phonetic Alphabet (IPA) (maybe an api exists?) Also, see [this](https://support.google.com/translate/thread/22827704?hl=en)
* Can you just pass the front and back values to the edit component to prefill in the forms, instead of querying the database again for them?
* How do I simplify all this prop passing??????!!??? (Refactoring)
* Delete button should be in edit screen also, or only. Just thinking if the user wants to delete a slew of cards. (UX)
* Forms validation (UX and Data Persistence)
* Add Warning to Delete (UX)
* Add confirmation Flashes to various actions (UX)
* Edit should pop up as modal instead of at top of display card screen (UX)
* Wouldn't you also add cards from the card collection screen? (UX)
* Check out NavLink for React Router (Cole lecture) for nav styling...
* Test speaking with speech commands...for instance, you'll see Hello World, then you speak the equivalent Spanish phrase and it tests to see how right you got it...
* Languages listed are all out of order, etc, because of the map you're using, I would like this to be more user friendly...
* Build your own implementation of the Google Translate API module, allowing for more robust use of its features
* Implement SRS algorithm for quiz
* It should pull supported languages only once per session, right now it's calling it every time the add card screen is loaded.
* The quiz cards should be in random order...
* It should track right and wrong answers with a fluency score
* Take the user's google photo and apply filters to it, like outline, or flip around, or invert colors, you get it from the google user object...when they upload a photo, instead use some other photo of a goofy looking animal.
* What kind of data do you need to have a working quiz?
* UX, work on making things smoother, because SPAs are just so abrupt, it can be jarring...
* Edit card: There should be a disable button
* How do I protect users privacy from me, at the moment I can see all users cards, that is not the scenario I want. Apprently this would take end-to-end encryption, and if the user would want to sort/filter data, it would need to be done on the client side, since the database wouldn't have access to the data. Just something to consider.
* Display Cards: User should be able to sort cards by front, back, date created, last date reviewed
* Display Cards: User should be able to search for cards
* Add card page should have a flip to and from languages button
* Add card should have a study reverse option
* Better slow-internet connection experience...some kind of pwa, or some way to indicate loading or working...
* It should check for duplicate cards??
* implement Context API for better state management

Obsolete:

- ~~Roadmap: Basics → Split into Components → Routing → Firebase → Refine Functionality → Design~~

Current Security Rules, check against best practices. Basic idea is that a user can edit card in their cards collection:

```
rules_version = '2';
service cloud.firestore {
    match /databases/{database}/documents {
        match /users/{uid}/cards/{id} {
            allow read, write, update, delete: if request.auth.uid != null && request.auth.uid == uid;
        }
    }
}
```
