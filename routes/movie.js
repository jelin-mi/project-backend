// mycode:
const { Router } = require('express');
const express = require('express');
const Movie = require('../models/Movie.model');

function filmRoutes() {
  const router = express.Router();

  // CREATE --> POSTMAN: POST http://localhost: 5005/films (envío el objeto de la L10)
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

  // READ all --> POSTMAN: GET http://localhost: 5005/films
  router.get('/', async (req, res, next) => {
    try {
      const movieResponse = await Movie.find();
      res.json(movieResponse);
    } catch (e) {
      next(e);
    }
  });

  // READ detail --> POSTMAN: GET http://localhost: 5005/films/<some id>
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const movie = await Movie.findById(id);
      res.json(movie);
    } catch (e) {
      next(e);
    }
  });

  // UPDATE --> POSTMAN: PUT http://localhost: 5005/films/<some id> (envío el objeto de la L10)
  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, year, director, channel, buddy, synopsis, rating } = req.body;

    try {
      const movie = await Movie.findByIdAndUpdate(id, { name, year, director, channel, buddy, synopsis, rating }, { new: true });
      res.json(movie);
    } catch (e) {
      next(e);
    }
  });

  // DELETE --> POSTMAN: DELETE http://localhost: 5005/films/<some id>
  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const movie = await Movie.findByIdAndDelete(id);
      res.json(movie);
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = filmRoutes;