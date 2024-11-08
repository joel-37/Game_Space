import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import '../style/GameContainer.css';

const GameContainer = ({ searchTerm, genre, developer, publisher, ratingRange }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 15;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/games');
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Filter games based on the search term and filters
  const filteredGames = games.filter(game => {
    const matchesSearchTerm = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genre ? game.genre === genre : true;
    const matchesDeveloper = developer ? game.developer === developer : true;
    const matchesPublisher = publisher ? game.publisher === publisher : true;
    const matchesRating = (
      (ratingRange.min ? game.rating >= ratingRange.min : true) &&
      (ratingRange.max ? game.rating <= ratingRange.max : true)
    );

    return matchesSearchTerm && matchesGenre && matchesDeveloper && matchesPublisher && matchesRating;
  });

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  // Reset currentPage when searchTerm or filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, genre, developer, publisher, ratingRange]);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Determine which games to display on the current page
  const currentGames = filteredGames.slice(currentPage * gamesPerPage, (currentPage + 1) * gamesPerPage);

  return (
    <div className="game-card-container" aria-live="polite">
      {loading && <h2 aria-live="assertive">Loading games...</h2>}
      {error && <h2 className="error-message" aria-live="assertive">Error loading games: {error}</h2>}
      {currentGames.length > 0 ? (
        currentGames.map(game => (
          <GameCard key={game._id} {...game} />
        ))
      ) : (
        !loading && (
          <div className="no-games">
            <h2>No games found</h2>
            <p>Try searching for something else.</p>
          </div>
        )
      )}
      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages - 1 }>
          Next
        </button>
      </div>
    </div>
  );
};

export default GameContainer;
