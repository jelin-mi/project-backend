const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const watchlistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
});
watchlistSchema.index({ user: 1, movie: 1 }); //TODO Dani
module.exports = model('Watchlist', watchlistSchema);
