const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
  },
  year: Number,
  director: String,
  channel: String,
  buddy: String,
  synopsis: String,
  rating: { type: Number, enum: [1, 2, 3] },
});

module.exports = model('Movie', movieSchema);