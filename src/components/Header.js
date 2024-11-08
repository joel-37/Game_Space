import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Header.css';
import Filter from './Filter';

const Header = ({ 
  isSignedIn, 
  handleSignIn, 
  handleSignOut, 
  genres, 
  tempGenre, 
  setTempGenre, 
  developers, 
  tempDeveloper, 
  setTempDeveloper, 
  publishers, 
  tempPublisher, 
  setTempPublisher, 
  tempRatingRange, 
  setTempRatingRange,
  applyFilters,
  searchTerm,
  setSearchTerm
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const onApplyFilters = () => {
    applyFilters(); // Call applyFilters to update the main states
    setIsSidebarOpen(false); // Close the sidebar after applying filters
  };

  return (
    <div className="header">
      <button 
        className="btn-menu" 
        onClick={toggleSidebar} 
        aria-label="Menu" 
        aria-expanded={isSidebarOpen} // Added for accessibility
      >
        ☰ 
      </button>

      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        aria-label="Search games"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term directly
      />

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="btn-close" onClick={toggleSidebar} aria-label="Close Menu">✖</button>
        
        <Filter 
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
          onApplyFilters={onApplyFilters} // Pass down the function
        />
      </div>

      <div className="auth-buttons">
        {isSignedIn ? (
          // If signed in, show the Sign Out button
          <button className="btn-signout" onClick={handleSignOut}>Sign Out</button>
        ) : (
          // If not signed in, show the Sign In and Sign Up buttons
          <>
            <button className="btn-signin" onClick={handleSignInClick}>Sign In</button>
            <button className="btn-signup" onClick={handleSignUpClick}>Sign Up</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
