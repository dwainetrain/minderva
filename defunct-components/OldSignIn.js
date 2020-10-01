import React, { useState } from 'react';

// email password
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('You signed in!')
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

            <button>Sign In</button>
        </form>
    )
}

export default SignIn;