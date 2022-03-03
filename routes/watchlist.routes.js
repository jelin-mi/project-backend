const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const Watchlist = require('../models/Watchlist.model');

// CREATE
router.post('/watchlist', isAuthenticated, async (req, res, next) => {
  // send the data in the request body to the server, the bodyParser (Nodejs parsing middleware) catches it and turns it into a JS object
  const { movieId } = req.body; // we need movieId = objectId for movie property of Watchlist model
  const user = req.payload; // we need user (user id) = objectId for user property of Watchlist model
  try {
    const watchlist = await Watchlist.create({ user: user._id, movie: movieId });
    // user and movie are the 2 fields of Watchlist model, their data type is ObjectId, so we need to use id here.
    // we have user id from the payload (= a part of json web token to store the data; from isAuthenticated injwt middleware)
    res.json({
      created: watchlist,
    });
  } catch (e) {
    next(e);
  }
});

// READ Watchlist
router.get('/watchlist', isAuthenticated, async (req, res, next) => {
  const user = req.payload;
  try {
    const watchList = await Watchlist.findOne({ user: user._id }).populate('movie');
    // populate is used to retrieve all the information (not just id)
    // .populate(propertyToBePopulated) --> in my case .populate('movie') --> movieId is under the 'movie' property (line 10)

    res.json(watchList);
  } catch (e) {
    next(e);
  }
});

module.exports = router;