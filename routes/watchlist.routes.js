const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const Watchlist = require('../models/Watchlist.model');

// CREATE Watchlist
router.post('/', isAuthenticated, async (req, res, next) => {
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
router.get('/', isAuthenticated, async (req, res, next) => {
  const user = req.payload;
  console.log(user);
  try {
    const watchList = await Watchlist.find({ user: user._id }).populate('movie');
    res.json(watchList);
  } catch (e) {
    next(e);
  }
});

module.exports = router;