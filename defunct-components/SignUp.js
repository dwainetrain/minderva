import React, { useState } from 'react';
import { auth } from '../firebase'

// email password
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try{
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password,
            );
            console.log('User Created!', user)
        } catch (error) {
            alert(error);
        }

        setEmail('')
        setPassword('')
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
            />

            <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            />

            <button>Create Account</button>
        </form>
    )
}

export default SignIn;