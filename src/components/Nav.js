import React from 'react';
import { Link } from 'react-router-dom';
// import { Link } from '@reach/router'

const Nav = () => (
    <nav>
        <Link to ="/">Home</Link>{" "}
        <Link to="card-collection">Display Cards</Link>{" "}
        <Link to="add-cards">Add Cards</Link>{" "}
        <Link to="quiz">Review Cards</Link>{" "}
        <Link to="user-profile">User Profile</Link>{" "}
    </nav>
)

export default Nav;