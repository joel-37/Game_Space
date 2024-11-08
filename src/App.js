import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import GameContainer from './components/GameContainer';
import GameDetail from './components/GameDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Manage sign-in status
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');
  const [ratingRange, setRatingRange] = useState({ min: '', max: '' });

  // Temporary states for filters
  const [tempGenre, setTempGenre] = useState('');
  const [tempDeveloper, setTempDeveloper] = useState('');
  const [tempPublisher, setTempPublisher] = useState('');
  const [tempRatingRange, setTempRatingRange] = useState({ min: '', max: '' });

  const genres = ['Action', 'Adventure', 'RPG', 'Strategy'];
  const developers = ['Nintendo', 'Epic Games', 'Mojang', 'Sony', 'Rockstar Games', 'Innersloth'];
  const publishers = ['Nintendo', 'Epic Games', 'Mojang', 'Sony', 'Rockstar Games', 'Innersloth'];

  // Sign-in and sign-out handlers
  const handleSignIn = () => setIsSignedIn(true);
  const handleSignOut = () => setIsSignedIn(false);

  // Apply filter changes
  const applyFilters = () => {
    setGenre(tempGenre);
    setDeveloper(tempDeveloper);
    setPublisher(tempPublisher);
    setRatingRange(tempRatingRange);

    // Log applied filters
    console.log('Filters applied:', {
      searchTerm,
      genre: tempGenre,
      developer: tempDeveloper,
      publisher: tempPublisher,
      ratingRange: tempRatingRange,
    });
  };

  return (
    <Router>
      <Routes>
        {/* Layout component to handle header and other global components */}
        <Route 
          path="/" 
          element={
            <Layout 
              isSignedIn={isSignedIn}
              handleSignIn={handleSignIn}
              handleSignOut={handleSignOut}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              genres={genres}
              tempGenre={tempGenre}
              setTempGenre={setTempGenre}
              developers={developers}
              tempDeveloper={tempDeveloper}
              setTempDeveloper={setTempDeveloper}
              publishers={publishers}
              tempPublisher={tempPublisher}
              setTempPublisher={setTempPublisher}
              tempRatingRange={tempRatingRange}
              setTempRatingRange={setTempRatingRange}
              applyFilters={applyFilters}
            />
          }
        >
          {/* Home page with game container */}
          <Route 
            index 
            element={
              isSignedIn ? (
                <GameContainer 
                  searchTerm={searchTerm} 
                  genre={genre} 
                  developer={developer} 
                  publisher={publisher} 
                  ratingRange={ratingRange} 
                />
              ) : (
                <Navigate to="/signin" /> // Redirect to Sign-In if not signed in
              )
            }
          />

          {/* Game details page */}
          <Route path="/games/:id" element={isSignedIn ? <GameDetail /> : <Navigate to="/signin" />} />

          {/* Sign-In page */}
          <Route path="/signin" element={!isSignedIn ? <SignIn handleSignIn={handleSignIn} /> : <Navigate to="/" />} />

          {/* Sign-Up page */}
          <Route path="/signup" element={!isSignedIn ? <SignUp handleSignIn={handleSignIn} /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
