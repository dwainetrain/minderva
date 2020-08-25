import React, { useState, useEffect } from 'react';

import UserRoute from './components/UserRoute';
import LogIn from './components/LogIn'
import { Link } from 'react-router-dom'
import { firestore, auth } from './firebase';
import { collectIdsAndDocs } from './utilities';

import Message from './components/Messages'

/// Styling
import './App.css';
import { Box } from '@chakra-ui/core'




function App() {

  const [cardCollection, setCardCollection] = useState(['loading']);

  // For User Language Prefs
  const [userLanguagePreferences, setUserLanguagePreferences] = useState('')
  
  
  // Auth state
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // streaming the database, being sure to unsubscribe to avoid memory leaks, I think...
  useEffect(() => {

      const unsubscribeFromFirestore = firestore.collection(`${user ? `users/${user.uid}/cards` : null}`)
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(collectIdsAndDocs)
        setCardCollection(entries);
      });
      
      const unsubscribeFromUserProfile = firestore.collection(`users`)
                      .doc(`${user ? user.uid : null}`)
                      .collection('profile')
                      .onSnapshot(snapshot => {
                        const entries = snapshot.docs.map(collectIdsAndDocs)
                        setUserLanguagePreferences(entries[0])
                        console.log(snapshot.docs)
                      });

      const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
        setUser(user)
        setLoading(false)
      })

    return () => {
  
      unsubscribeFromFirestore();
      unsubscribeFromAuth();
      unsubscribeFromUserProfile();
    }
    
  }, [user]);

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null)
    }, 2400)
  }
    
  return (
    <div className="App">
      {loading ? <p>Loading...</p> : 
      user ? <UserRoute user={user} userLangPrefs={userLanguagePreferences} cardCollection={cardCollection} handleMessage={handleMessage} loading={loading}/> :
        <>
          <LogIn />
        </>
      }
        {message && <Message type={message} />}
        
        <Box as="footer" backgroundColor="grayGreen.200">
          <Box pl={40}>
            <Link to="/about" >MVP Build 0.10</Link>
          </Box>
        </Box>
    </div>
  );
}

export default App;