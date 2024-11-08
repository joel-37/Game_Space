const mongoose = require('mongoose');
const Game = require('./models/Game'); // Adjust path as necessary
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017/GameInfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');

  // Load game data from JSON file
  const data = JSON.parse(fs.readFileSync('./data/extraGameData.json', 'utf8'));

  // Insert the data into the Game collection
  await Game.insertMany(data);

  console.log('Data successfully inserted');
  mongoose.connection.close();
}).catch(err => {
  console.error('Error:', err);
});
