import React from 'react';
import { Link } from 'react-router-dom';
// import { Link } from '@reach/router'

const Nav = () => (
    <nav>
        <Link exact to ="/">Home</Link>{" "}
        <Link exact to="card-collection">Display Cards</Link>{" "}
        <Link exact to="add-cards">Add Cards</Link>{" "}
        <Link exact to="quiz">Review Cards</Link>{" "}
        <Link exact to="user-profile">User Profile</Link>{" "}
    </nav>
)

export default Nav;