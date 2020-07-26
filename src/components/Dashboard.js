import React from 'react';
import { translate_key } from '../apis';

const Dashboard = () => {
    ///// Imports the Google Cloud client library

    // Hot damn, this works!
    const googleTranslate = require('google-translate')(translate_key);
    
    googleTranslate.translate('My name is Brandon', 'es', function(err, translation) {
        console.log(translation.translatedText);
        // =>  Mi nombre es Brandon
      });
        
        return(
        <h1>Dashboard</h1>
    )}

export default Dashboard;

