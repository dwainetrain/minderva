import React, { useState, useEffect } from 'react';

import UserRoute from './UserRoute';
import LogIn from './LogIn';
import Message from './Messages'
// import LogInWithEmail from './LogInWithEmail'
import { Link } from 'react-router-dom'
import { firestore, auth } from '../firebase';
// import { collection, doc, setDoc } from "firebase/firestore";
import { collectIdsAndDocs } from '../utilities';

/// Styling
import './App.css';
import { Box, useToast, AlertStatus } from '@chakra-ui/react';
// import { ToastStatus, ToastMessages } from './@types/toast';

// Constants
import { messages } from "./constants/messages"

// Types
// import { CardAction, User, UserLangPrefs } from './@types/card';
// make alias for greater readability
import { User } from "firebase/auth";
import { UserLangPrefs } from './@types/card';

interface entry {
  id: string
}

function App() {

  const [cardCollection, setCardCollection] = useState<entry[]>([]);

  // For User Language Prefs
  const [userLanguagePreferences, setUserLanguagePreferences] = useState<UserLangPrefs>({
    targetCode: '',
    originCode: ''
  });


  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [cardsLoaded, setCardsLoaded] = useState(false);

  // streaming the database, being sure to unsubscribe to avoid memory leaks, I think...
  useEffect(() => {

    const unsubscribeFromFirestore = firestore.collection(`${user ? `users/${user.uid}/cards` : null}`)
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(collectIdsAndDocs)
        setCardCollection(entries);
        setCardsLoaded(true)
      });

    const unsubscribeFromUserProfile = firestore.collection(`users`)
      .doc(`${user ? user.uid : null}`)
      .collection('profile')
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(collectIdsAndDocs)
        console.log(`****ENTRIES ${JSON.stringify(entries)}`)
        // setUserLanguagePreferences({ targetCode: entries[0].targetCode, originCode: entries[0].originCode })
        window.localStorage.setItem('USER_LANGUAGE_PREF', JSON.stringify({ targetCode: entries[0].targetCode, originCode: entries[0].originCode }));

        const data = window.localStorage.getItem('USER_LANGUAGE_PREF');
        if (data !== null) setUserLanguagePreferences(JSON.parse(data));
      });

    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      setUser(user as User);
      setLoading(false);
      return () => {
        unsubscribeFromAuth();
      }
    })

    return () => {

      unsubscribeFromFirestore();
      unsubscribeFromAuth();
      unsubscribeFromUserProfile();
    }

  }, [user]);

  const toast = useToast();
  const handleMessage = (message: string, status: AlertStatus): void => {
    toast({
      position: "bottom",
      description: messages[message],
      status: status,
      duration: 3000,
      isClosable: false,
    })
    setMessage('')
  }

  return (
    <div className="App">
      {loading ? <p>Loading...</p> :
        user ? <UserRoute user={user} userLangPrefs={userLanguagePreferences} cardCollection={cardCollection} handleMessage={handleMessage} loading={loading} cardsLoaded={cardsLoaded} /> :
          <>
            <LogIn />
          </>
      }
      {message && <Message type={message} />}

      <Box as="footer" backgroundColor="grayGreen.200">
        <Box pl={{ sm: 10, md: 24 }}>
          <Link to="/about" >MVP Build 0.14</Link>
        </Box>
      </Box>
    </div>
  );
}

export default App;