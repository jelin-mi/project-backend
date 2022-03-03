require('dotenv/config');
require('./db');
const express = require('express');
const { isAuthenticated } = require('./middleware/jwt.middleware');
const authRouter = require('./routes/auth.routes');
const movieRouter = require('./routes/movie.routes');
const userRouter = require('./routes/user.routes');
const watchlistRouter = require('./routes/watchlist.routes');

const app = express();
require('./config')(app);

app.use('/auth', authRouter);
app.use('/api/movies', movieRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/api/profile', isAuthenticated,  userRouter);

require('./error-handling')(app);

module.exports = app;