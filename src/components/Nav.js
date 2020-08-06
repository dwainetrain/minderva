import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../firebase'

const Nav = () => (
    <nav>
        <Link to ="/">Home</Link>{" "}
        <Link to="card-collection">Card Collection</Link>{" "}
        <Link to="add-cards">Add Cards</Link>{" "}
        <Link to="quiz">Review Cards</Link>{" "}
        <Link to="user-profile">User Profile</Link>{" "}
        <Link to="/" onClick={signOut}>Sign Out</Link>
    </nav>
)

export default Nav;