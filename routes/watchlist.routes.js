const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const Watchlist = require('../models/Watchlist.model');

// CREATE Watchlist
router.post('/', isAuthenticated, async (req, res, next) => {
  const { movieId } = req.body;
  const user = req.payload;
  try {
    const added = await Watchlist.findOne({ user: user._id, movie: movieId }).exec();
    console.log(added);
    if (added) {
      res.status(400).json({ message: 'This movie is already in your Watchlist' });
    } else {
      const watchlist = await Watchlist.create({ user: user._id, movie: movieId });
      res.json({
        created: watchlist,
      });
    }
  } catch (e) {
    next(e);
  }
});

// READ Watchlist
router.get('/', isAuthenticated, async (req, res, next) => {
  const user = req.payload;
  console.log(user);
  try {
    const watchlist = await Watchlist.find({ user: user._id }).populate('movie');
    res.json(watchlist);
  } catch (e) {
    next(e);
  }
});

// DELETE from Watchlist
router.post('/delete', isAuthenticated, async (req, res, next) => {
  const { watchlistId } = req.body;
  try {
    const watchlist = await Watchlist.findByIdAndDelete(watchlistId);
    res.json({
      removed: watchlist,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
