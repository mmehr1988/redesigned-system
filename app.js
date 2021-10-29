// importing express
const express = require('express');

// HTTP request logger middleware
const morgan = require('morgan');

// Error Handlers
const exphbs = require('express-handlebars');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const workoutRouter = require('./routes/workoutRoutes');
const htmlRouter = require('./routes/htmlRoutes');

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

// A function that upon calling will add a bunch of methods from express to our variable = app
const app = express();

//[1] MIDDLEWARES ---------------------------------------------------------------------------
app.use(morgan('dev'));

// This is so the post requests are converted into a JSON format. Without it, when we make a post request, we would not be able to see the JSON data in console.
app.use(express.json());

// To access the static files or in other words the public folder files
app.use(express.static(`${__dirname}/public`));

// To add request time to when a request is made
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// [3] ROUTES ---------------------------------------------------------------------------
app.use('/api/workouts', workoutRouter);
app.use('/', htmlRouter);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// MIDDLEWARE: To handle the unhandled routes
// Rememeber, middleware get added to the middleware stack and this is why this error handler works
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
