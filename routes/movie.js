// mycode:
const express = require('express');
const Movie = require('../models/Movie.model');

// line 28
function filmRoutes() {
  const router = express.Router();

  // CREATE --> POSTMAN: POST http://localhost: 5005/film (envío el objeto de la L11)
  router.post('/', async (req, res, next) => {
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

  // READ --> POSTMAN: GET http://localhost: 5005/film
  router.get('/', async (req, res, next) => {
    try {
      const movieResponse = await Movie.find();
      res.json(movieResponse);
    } catch (e) {
      next(e);
    }
  });
}
