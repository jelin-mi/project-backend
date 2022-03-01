const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Please use a valid email address.'] },
  password: { type: String, required: [true, 'password is required'] },
  name: String,
  favouriteMovies: String,
  preferredDirector: String,
  myBuddies: String,
  avatar: String,
});

module.exports = model('User', userSchema);