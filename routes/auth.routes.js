const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const router = express.Router();
const saltRounds = 10;

// POST  /auth/signup
router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === '' || password === '') {
    res.status(400).json({ message: 'Provide email and password.' });
    return;
  }

  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }

  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
    });
    return;
  }

  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then(foundUser => {
      if (foundUser) {
        res.status(400).json({ message: 'User already exists.' });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      return User.create({ email, password: hashedPassword });
    })
    .then(createdUser => {
      // Deconstruct the newly created user object to omit the password
      const { email, _id } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, _id };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// POST  /auth/login
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === '' || password === '') {
    res.status(400).json({ message: 'Provide email and password.' });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then(foundUser => {
      if (!foundUser) {
        res.status(401).json({ message: 'User not found.' });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email };

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h',
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: 'This password is not correct.' });
      }
    })
    .catch(err => res.status(500).json({ message: 'Internal Server Error' }));
});

// GET  /auth/verify
router.get('/verify', isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;
