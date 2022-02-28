require('dotenv/config');
require('./db');
const express = require('express');

const { isAuthenticated } = require('./middleware/jwt.middleware');
const allRoutes = require('./routes');
const authRouter = require('./routes/auth.routes');
const protectedRoute = require('./routes/protected.routes');
// mycode:
const filmRoutes = require('./routes/movie');

const app = express();

require('./config')(app);

app.use('/api', allRoutes);
app.use('/api/protected', isAuthenticated, protectedRoute);
app.use('/auth', authRouter);     // authRouter para las rutas del modelo User

// mycode:
app.use('/films', filmRoutes); // filmRoutes para las rutas del modelo Movie

require('./error-handling')(app);

module.exports = app;