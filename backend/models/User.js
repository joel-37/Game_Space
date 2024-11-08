const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Plain-text password
  phone: { type: String, required: true },
});

// Remove the bcrypt password hashing middleware
// The password will be stored in plain-text now

const User = mongoose.model('User', userSchema);
module.exports = User;
