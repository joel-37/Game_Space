import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/GameDetail.css'; // Import the CSS file

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0); // State to manage the rating
  const [randomRating, setRandomRating] = useState(null); // State for random rating

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/games/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch game details. Status: ${response.status}`);
        }
        const data = await response.json();
        setGame(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleRating = (star) => {
    setRating(star);
  };

  const handleSubmitRating = () => {
    // Generate a random rating between 3, 3.5, 4, 4.5, or 5
    const randomRatings = [3, 3.5, 4, 4.5, 5];
    const randomIndex = Math.floor(Math.random() * randomRatings.length);
    const newRandomRating = randomRatings[randomIndex];
    
    // Update the random rating state
    setRandomRating(newRandomRating);

    // Optionally, send the random rating to the backend (if needed)
    console.log("Random rating generated:", newRandomRating);

    // You can update the backend rating submission logic here if necessary
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  const placeholderImage = 'https://via.placeholder.com/300';
  const gameImage = game.image ? `http://localhost:5000/images/${game.image}` : placeholderImage;

  return (
    <div className="game-detail">
      <div className="game-detail-basic">
        <img src={gameImage} alt={game.name} />
        <div className="game-detail-content">
          <h1>{game.name}</h1>
          <p>{game.description}</p>
          <p><strong>Genre:</strong> {game.genre || 'N/A'}</p>
          <p><strong>Release Date:</strong> {game.releaseDate || 'N/A'}</p>
          <p><strong>Developer:</strong> {game.developer || 'N/A'}</p>
          <p><strong>Publisher:</strong> {game.publisher || 'N/A'}</p>

          {/* 5-Star Rating Input */}
          <div className="game-rating">
            <h2>Rating:</h2>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? 'filled' : ''}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <button className="submit-rating" onClick={handleSubmitRating}>Submit</button>
          </div>

          {/* Display Random Rating */}
          {randomRating && (
            <div className="overall-rating">
              <h2>Overall rating: {randomRating}</h2>
            </div>
          )}
        </div>
      </div>

      {/* Additional Data Sections - full-width */}
      <div className="game-detail-extra">
        <h2>Story</h2>
        <p>{game.story || 'No story available.'}</p>
      </div>
      <div className="game-detail-extra">
        <h2>Gameplay</h2>
        <p>{game.gameplay || 'No gameplay information available.'}</p>
      </div>
      <div className="game-detail-extra">
        <h2>Main Character</h2>
        <p>{game.main_character || 'No main character information available.'}</p>
      </div>
      <div className="game-detail-extra">
        <h2>World</h2>
        <p>{game.world || 'No world information available.'}</p>
      </div>
      <div className="game-detail-extra">
        <h2>Unique Feature</h2>
        <p>{game.unique_feature || 'No unique feature available.'}</p>
      </div>
    </div>
  );
};

export default GameDetail;
