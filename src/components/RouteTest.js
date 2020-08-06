import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Home= () => {
    <div>You are Home</div>
}

const SecondHome = () => {
    <div>You are at your second home</div>
}

const RoomInSecondHome = () => {
    <div>You are in a room at your second home</div>
}

return(
    <Router>
        <Route path="/" component={Home} />
    </Router>
)