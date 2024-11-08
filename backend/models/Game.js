const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    image: String,
    genre: String,
    rating: String,
    publisher: String,
    developer: String,
    story: String,
    gameplay: String,
    main_character: String,
    world: String,
    unique_feature: String,
});

const Game = mongoose.model('Game', gameSchema);

// Using async/await
const getGames = async () => {
    try {
        const games = await Game.find();  // No callback function here
        console.log(games); // Logs all the games
    } catch (err) {
        console.error('Error retrieving games:', err);
    }
};

// Call the function to retrieve games
getGames();

module.exports = Game;
