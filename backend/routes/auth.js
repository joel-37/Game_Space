const express = require('express');
const bcrypt = require('bcryptjs'); // Add bcrypt for password hashing
const User = require('../models/User'); // User model for sign-up and sign-in

const router = express.Router();

// Route for sign-up
router.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user with hashed password
    const user = new User({
      name,
      email,
      password: hashedPassword, // Storing hashed password
      phone,
    });
    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during sign-up:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for sign-in (Login Validation)
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // If email and password match, respond with success
    res.status(200).json({
      message: 'Sign-in successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    console.error('Error during sign-in:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
