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

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.addMessage = functions.https.onRequest(async (request, response) => {
    const original = request.query.text;
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    response.json({ result: `Message with ID: ${writeResult.id} added.`});
});

