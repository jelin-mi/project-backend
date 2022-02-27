const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] },
  hashedPassword: { type: String, required: [true, 'password is required'] },
  userName: String,
  favouriteMovies: String,
  preferredDirector: String,
  myBuddies: String,
  avatar: String,
});

module.exports = model('User', userSchema);