const router = require('express').Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const Movie = require('../models/Movie.model');

// CREATE
router.post('/', isAuthenticated, async (req, res, next) => {
  const { title, year, director, channel, buddy, synopsis, rating } = req.body;
  const user = req.payload;
  try {
    const movie = await Movie.create({ title, year, director, channel, buddy, synopsis, rating, owner: user._id });
    res.json({
      created: movie,
    });
  } catch (e) {
    next(e);
  }
});

// READ all
router.get('/', async (req, res, next) => {
  try {
    const movieResponse = await Movie.find();
    res.json(movieResponse);
  } catch (e) {
    next(e);
  }
});

// READ detail
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  // Check if the id string provided through the URL parameter is a valid Hexadecimal string.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    const movie = await Movie.findById(id);

    if (movie === null) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.status(200).json(movie);
  } catch (e) {
    next(e);
  }
});

// UPDATE
router.put('/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { title, year, director, channel, buddy, synopsis, rating } = req.body;
  const user = req.payload;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    const movie = await Movie.findOneAndUpdate({ _id: id, owner: user._id },{ title, year, director, channel, buddy, synopsis, rating }, { new: true });

    if (movie) {
       res.json(movie);
       return;
    }
    res.status(404).json({ error: 'Movie not found' });
   
  } catch (e) {
    next(e);
  }
});

module.exports = router;
