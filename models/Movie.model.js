const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
  },
  year: Number,
  country: String,
  director: String,
  channel: String,
  buddy: String,
  synopsis: String,
  rating: Number,
  imageUrl: String,
});

module.exports = model('Movie', movieSchema);
