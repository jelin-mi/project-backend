const router = require('express').Router();
const mongoose = require('mongoose');

const Movie = require('../models/Movie.model');

// CREATE
router.post('/movies', async (req, res, next) => {
  const { name, year, director, channel, buddy, synopsis, rating } = req.body;

  try {
    const movie = await Movie.create({ name, year, director, channel, buddy, synopsis, rating });
    res.json({
      created: movie,
    });
  } catch (e) {
    next(e);
  }
});

// READ all
router.get('/movies', async (req, res, next) => {
  try {
    const movieResponse = await Movie.find();
    res.json(movieResponse);
  } catch (e) {
    next(e);
  }
});

// READ detail
router.get('/movies/:id', async (req, res, next) => {
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
router.put('/movies/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, year, director, channel, buddy, synopsis, rating } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    const movie = await Movie.findByIdAndUpdate(id, { name, year, director, channel, buddy, synopsis, rating }, { new: true });
    res.json(movie);
  } catch (e) {
    next(e);
  }
});

// DELETE
router.delete('/movies/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    const movie = await Movie.findByIdAndDelete(id);
    res.json(movie);
  } catch (e) {
    next(e);
  }
});

module.exports = router;