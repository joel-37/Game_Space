import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GameCard.css';

const GameCard = ({ name, description, image, _id }) => {
  const navigate = useNavigate();

  console.log("GameCard ID:", _id);

  const handleViewClick = () => {
    navigate(`/games/${_id}`); // Navigate to the game details page
  };

  const placeholderImage = 'https://via.placeholder.com/150'; // Example placeholder
  const gameImage = image ? `http://localhost:5000/images/${image}` : placeholderImage;

  return (
    <div className="game-card">
      <img src={gameImage} alt={name} className="game-image" />
      <h3>{name}</h3>
      <p>{description}</p>
      <button className="btn-view" onClick={handleViewClick}>
        View
      </button>
    </div>
  );
};

export default GameCard;
