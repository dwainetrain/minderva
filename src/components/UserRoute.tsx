import React from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';

import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import AddCard from './AddCard';
import Quiz from './Quiz';
import Review from './Review';
import DisplayCards from './DisplayCards';
import NotFound from './NotFound'
import About from './About'
import Header from './Header'

/* Primary routing of app */

const UserRoute = ({ user, cardCollection, handleMessage, userLangPrefs, loading, cardsLoaded }) => {
    const location = useLocation();

    const CardActionsWrapper = ({ mode }) => {
        const { id } = useParams();
        return <AddCard
            cardId={id}
            handleMessage={handleMessage}
            user={user}
            userLangPrefs={userLangPrefs}
            mode={mode}
        />;
    };


    return (
        <>
            <header className="App-header">
                {location.pathname === "/quiz" ? null : <Header />}
            </header>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard user={user} cardCollection={cardCollection} {...loading} cardsLoaded={cardsLoaded} />} />

                    <Route path="/review" element={<Review cardCollection={cardCollection} cardsLoaded={cardsLoaded} />} />

                    <Route path="/quiz" element={<Quiz cardCollection={cardCollection} />} />

                    <Route path="/card-collection" element={<DisplayCards cardCollection={cardCollection} user={user} handleMessage={handleMessage} cardsLoaded={cardsLoaded} />} />

                    <Route path="/edit-card/:id" element={<CardActionsWrapper mode="update" />} />

                    <Route path="/add-cards" element={<CardActionsWrapper mode="add" />} />

                    <Route path="/user-profile" element={<UserProfile user={user} userLangPrefs={userLangPrefs} handleMessage={handleMessage} />} />

                    <Route path="/about" element={<About />} />

                    <Route element={<NotFound />} />
                </Routes>
            </div>
        </>
    )
}

export default UserRoute;