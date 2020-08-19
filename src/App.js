import React, { useState, useEffect } from 'react';

import UserRoute from './components/UserRoute';
import SignInAndSignUp from './components/SignInAndSignUp';

import { firestore, auth } from './firebase';
import { collectIdsAndDocs } from './utilities';

import Message from './components/Messages'

/// Styling
import './App.css';


function App() {

  const [cardCollection, setCardCollection] = useState([]);
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

      const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
        setUser(user)
        setLoading(false)
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
      {loading ? <p>Loading...</p> : 
      user ? <UserRoute user={user} cardCollection={cardCollection} handleMessage={handleMessage}/> :
        <>
          <h1>Minderva - A Language Learning Tool</h1>
          <SignInAndSignUp />
        </>
      }
        {message && <Message type={message} />}
        
        <footer>
            <p>MVP Build 0.10</p>
        </footer>
    </div>
  );
}

export default App;