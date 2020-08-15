const functions = require('firebase-functions');

const util = require('util');
const textToSpeech = require('@google-cloud/text-to-speech'); // Imports the Google Cloud client library

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

exports.translate = functions.https.onCall(async (data, context) => {

    const projectId = 'minderva-17770';
    
    // Instantiates a client
    const translate = new Translate({projectId});
    
    // The text to translate
    const text = data.text;
    
    // The target language
    const target = data.target;
    
    // Translates some text into Japanese
    const [translation] = await translate.translate(text, target);
    //const writeTranslation = await admin.firestore().collection('messages')
    //.add({text:text, translation: translation});

    return {translation:translation}
    // response.json({ result: `Translation with ID: ${writeTranslation.id} added.`})
    // console.log(`Text: ${text}`);
    // console.log(`Translation: ${translation}`);
    
})


// Adapted from https://stackoverflow.com/questions/54241849/save-an-audiofile-from-google-text-to-speech-to-firebase-storage-using-google-cl

/// Attempt to make the function directly callable
exports.gt2s = functions.https.onCall(async (data, context) => {
    try 
    {
      const word = data.text; // the text
      const longLanguage = 'Spanish';
      const audioFormat = '.mp3';
      // copied from https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries#client-libraries-usage-nodejs
      
      const client = new textToSpeech.TextToSpeechClient(); // Creates a client

      let myWordFile = word.replace(/ /g,"_"); // replace spaces with underscores in the file name
      myWordFile = myWordFile.toLowerCase(); // convert the file name to lower case
      myWordFile = myWordFile + audioFormat; // append .mp3 to the file name;

      // copied from https://cloud.google.com/blog/products/gcp/use-google-cloud-client-libraries-to-store-files-save-entities-and-log-data
      const {Storage} = require('@google-cloud/storage');
      const storage = new Storage();
      const bucketName = 'minderva-17770.appspot.com'
      const fileName = 'Audio/Spanish/' + myWordFile
      const bucket = storage.bucket('minderva-17770.appspot.com');
      const file = bucket.file('Audio/Spanish/' + myWordFile);

      const request = { // Construct the request
        input: {text: word},
        // Select the language and SSML Voice Gender (optional)
        voice: {languageCode: data.target, ssmlGender: 'FEMALE'},
        // Select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
      };

      const options = { // construct the file to write
        metadata: {
          contentType: 'audio/mpeg',
          metadata: {
            source: 'Google Text-to-Speech'
          }
        }
      };

      // copied from https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries#client-libraries-usage-nodejs
      const [response] = await client.synthesizeSpeech(request);
      // Write the binary audio content to a local file
      // response.audioContent is the downloaded file
      return await file.save(response.audioContent, options)
      .then(() => {
        console.log("File written to Firebase Storage.")
        return;
      }).then(
          async () => {
          console.log("Storage file variable: ", storage.file)
          console.log("Same thing?: ", storage.bucket(bucketName).file(fileName))
          await storage.bucket(bucketName).file(fileName).makePublic();
          const fileLocation = `https://storage.googleapis.com/${bucketName}/${fileName}`
          console.log(`https://storage.googleapis.com/${bucketName}/${fileName} is now public.`);
          return fileLocation; 
        }
        
      )
      .catch((error) => {
        console.error(error);
      });
      } // close try
      catch (error) {
        console.error(error);
    } // close catch

  })