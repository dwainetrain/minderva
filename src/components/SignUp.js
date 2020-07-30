import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase';

// display name, email

const SignUp = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Not sure what this should do yet,
        // because we're sending the value to firebase auth
        console.log('You signed up!')
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
            type='text'
            value={name}
            onChange={e => setName(e.target.value)} 
            placeholder="Display Name"
            />

            <input 
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)} 
            placeholder="email"
            />

            <button>Sign Up</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
                
        </form>
    )
}

export default SignUp;