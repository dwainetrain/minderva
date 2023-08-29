import React from 'react';
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import AddCard from './AddCard';
import EditCard from './EditCard'
import Quiz from './Quiz';
import Review from './Review';
import { Route, Routes, useLocation, useParams, useNavigate } from 'react-router-dom';
import DisplayCards from './DisplayCards';
import NotFound from './NotFound'
import About from './About'
import Header from './Header'

/* Primary routing of app */

const UserRoute = ({ user, cardCollection, handleMessage, userLangPrefs, loading, cardsLoaded }) => {
    const location = useLocation();
    const history = useNavigate();

    const CardActionsWrapper = ({ mode }) => {
        const { id } = useParams();
        return <AddCard
            cardId={id}
            handleMessage={handleMessage}
            user={user}
            userLangPrefs={userLangPrefs}
            mode={mode}
            history={history} />;
    };


    return (
        <>
            <header className="App-header">
                {location.pathname === "/quiz" ? null : <Header />}
            </header>
            <div>
                <Routes>
                    <Route exact path="/" element={<Dashboard user={user} cardCollection={cardCollection} loading={loading} cardsLoaded={cardsLoaded} />} />

                    <Route exact path="/review" element={<Review path="/review" cardCollection={cardCollection} cardsLoaded={cardsLoaded} />} />

                    <Route exact path="/quiz" element={<Quiz path="/quiz" cardCollection={cardCollection} />} />

                    <Route exact path="/card-collection" element={<DisplayCards path="/card-collection" cardCollection={cardCollection} user={user} handleMessage={handleMessage} cardsLoaded={cardsLoaded} />} />

                    <Route exact path="/edit-card/:id" element={<CardActionsWrapper mode="update" />} />

                    <Route exact path="/add-cards" element={<CardActionsWrapper mode="add" />} />

                    <Route exact path="/user-profile" element={<UserProfile user={user} userLangPrefs={userLangPrefs} handleMessage={handleMessage} />} />

                    <Route exact path="/about" element={<About />} />

                    <Route element={<NotFound />} />
                </Routes>
            </div>
        </>
    )
}

export default UserRoute;