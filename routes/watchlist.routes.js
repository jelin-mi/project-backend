const router = require('express').Router();

const User = require('../models/User.model');
const Movie = require('../models/Movie.model');
const Watchlist = require('../models/Watchlist.model');

// CREATE
router.post('/watchlist', isAuthenticated, async (req, res, next) => {
  const { movieId } = req.body;
  const user = req.payload;
  try {
    const watchlist = await Watchlist.create({ user: user._id, movie: movieId });
    res.json({
      created: watchlist,
    });
  } catch (e) {
    next(e);
  }
});


// READ Watchlist
router.get('/watchlist', isAuthenticated ,async (req, res, next) => {
  const user = req.payload;
  try {
    const watchList = await Watchlist.findOne({ user: user._id}).populate('movie');
    
    res.json(watchList);
  } catch (e) {
    next(e);
  }
});

module.exports = router;