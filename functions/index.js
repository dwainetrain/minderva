const functions = require('firebase-functions');

const util = require('util');
const textToSpeech = require('@google-cloud/text-to-speech'); // Imports the Google Cloud client library

const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

// Google Translation API
const {Translate} = require('@google-cloud/translate').v2;

exports.translate = functions.https.onCall(async (data, context) => {

    const projectId = 'minderva-17770';
    
    // Instantiates a client
    const translate = new Translate({projectId});
    
    // The text to translate
    const text = data.text;
    
    // The target language
    const target = data.target;
    
    // Translates some text
    const [translation] = await translate.translate(text, target);

    return {translation:translation}
    
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

      let myWordFile = word.replace(/ /g,"_").replace(/\?/g,"_q"); // replace spaces with underscores in the file name, and then replaces any question marks with _q (for google storage filename safety)
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

  /**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
  const { uid } = userRecord;
  console.log("User id from account creation: ", uid)

  return db
    .collection("users")
    .doc(uid)
    .collection("profile")
    .doc(uid)
    .set({ 
      originCode:'en',
      targetCode:'de', 
      originName:'English',
      targetName:'German',
      originSpeech:'en-UK',
      targetSpeech:'de-DE',
      genderSpeech:'female'
    })
    .catch(console.error);
};

exports.authOnCreate = functions.auth.user().onCreate(createProfile)