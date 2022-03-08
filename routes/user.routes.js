const router = require('express').Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const User = require('../models/User.model');

// READ User detail
router.get('/', isAuthenticated, async (req, res, next) => {
  const user = req.payload;
  if (!mongoose.Types.ObjectId.isValid(user._id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  try {
    const user = await User.findById(user._id); //TODO
    if (user === null) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

// UPDATE
router.put('/', async (req, res, next) => {
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
router.delete('/', async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  try {
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
