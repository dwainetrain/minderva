import React, { useState, useEffect } from 'react';

import UserRoute from './components/UserRoute';
import SignInAndSignUp from './components/SignInAndSignUp';

import { firestore, auth } from './firebase';
import { collectIdsAndDocs } from './utilities';

import Message from './components/Messages'

/// Styling
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import './App.css';

function App() {

  const [cardCollection, setCardCollection] = useState([]);
  // Auth state
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  // streaming the database, being sure to unsubscribe to avoid memory leaks, I think...
  useEffect(() => {
      const unsubscribeFromFirestore = firestore.collection(`${user ? `users/${user.uid}/cards` : null}`)
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(collectIdsAndDocs)
        setCardCollection(entries);
      });

      const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
        setUser(user)
      })

    return () => {
      unsubscribeFromFirestore();
      unsubscribeFromAuth();
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
        {message && <Message type={message} />}
        {user ? <UserRoute user={user} cardCollection={cardCollection} handleMessage={handleMessage}/> :
        <>
          <h1>Minderva - A Language Learning Tool</h1>
          <SignInAndSignUp />
        </>
        }
        <footer>
          <Container>
            <p>MVP Build 0.09</p>
          </Container>
        </footer>
    </div>
  );
}

export default App;