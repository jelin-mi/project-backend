const router = require('express').Router();
const mongoose = require('mongoose');

const User = require('../models/User.model');
const Movie = require('../models/Movie.model');

// READ detail 
router.get('/user/:id', async (req, res, next) => {
  const { id } = req.params;

  // Check if the id string provided through the URL parameter is a valid Hexadecimal string.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    const user = await User.findById(id);

    if (user === null) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

// UPDATE
router.put('/user/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, favouriteMovies, preferredDirector, myBuddies, avatar } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    const userUpdated = await User.findByIdAndUpdate(id, { name, favouriteMovies, preferredDirector, myBuddies, avatar }, { new: true });
    res.json(userUpdated);
  } catch (e) {
    next(e);
  }
});

// DELETE
router.delete('/user/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    await Movie.deleteMany({ owner: id }); //TODO The movies of the deleted user are NOT deleted.
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;