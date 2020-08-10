const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin');

admin.initializeApp();

// Google Translation API
const {Translate} = require('@google-cloud/translate').v2;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.addMessage = functions.https.onRequest(async (request, response) => {
//     const original = request.query.text;
//     const writeResult = await admin.firestore().collection('messages').add({original: original});
//     response.json({ result: `Message with ID: ${writeResult.id} added.`});
// });

// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//         const original = snap.data().original;

//         functions.logger.log('Uppercasing', context.params.documentId, original);

//         const uppercase = original.toUpperCase();

//         return snap.ref.set({uppercase}, {merge:true});
//     })

// Imports the Google Cloud client library

exports.translate = functions.https.onCall(async (original) => {

    const projectId = 'minderva-17770';
    
    // Instantiates a client
    const translate = new Translate({projectId});
    
    // The text to translate
    const text = original;
    
    // The target language
    const target = 'ja';
    
    // Translates some text into Japanese
    const [translation] = await translate.translate(text, target);
    const writeTranslation = await admin.firestore().collection('messages')
    .add({text:text, translation: translation});
    // response.json({ result: `Translation with ID: ${writeTranslation.id} added.`})
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
    
})
 

