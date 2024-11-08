const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Import Mongoose Models
const Game = require('./models/Game'); // Adjust path

// Import Auth Routes
const auth = require('./routes/auth');

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/GameInfo')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use the auth routes
app.use('/api/auth', auth);

// Route to get a game by ID
app.get('/api/games/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Route to get all games
app.get('/api/games', async (req, res) => {
  try {
    const { search, genre } = req.query;
    let query = {};

    if (genre) {
      query.genre = genre;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const games = await Game.find(query);
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
