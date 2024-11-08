import React, { useEffect, useState } from 'react';
import GameCard from './GameCard'; // Adjust import path as needed

const GameList = () => {
  const [games, setGames] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games'); // Check your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        console.log('Fetched games:', data); // Debug log
        setGames(data); // Set the fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames(); // Call the fetch function
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="game-list">
      {games.length > 0 ? (
        games.map(game => (
          <GameCard
            key={game._id}
            id={game._id}
            name={game.name}
            description={game.description}
            image={game.image}
          />
        ))
      ) : (
        <p>No games found.</p>
      )}
    </div>
  );
};

export default GameList;
