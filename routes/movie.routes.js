const router = require('express').Router();
const mongoose = require('mongoose');

const Movie = require('../models/Movie.model');

// CREATE ----------> POSTMAN: POST http://localhost: 5005/api/movies (envío el objeto de la L9)
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

// READ all ----------> POSTMAN: GET http://localhost: 5005/api/movies
router.get('/movies', async (req, res, next) => {
  try {
    const movieResponse = await Movie.find();
    res.json(movieResponse);
  } catch (e) {
    next(e);
  }
});

// READ detail ----------> POSTMAN: GET http://localhost: 5005/api/movies/<some id>
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

// UPDATE ----------> POSTMAN: PUT http://localhost: 5005/api/movies/<some id> (envío el objeto de la L10)
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

// DELETE ----------> POSTMAN: DELETE http://localhost: 5005/api/movies/<some id>
router.delete('/movies/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    const movie = await Movie.findByIdAndDelete(id);
    res.json(movie, { message: `Movie with ${id} is removed successfully.` });
  } catch (e) {
    next(e);
  }
});

module.exports = router;