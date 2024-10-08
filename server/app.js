const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index');

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_KEY));
app.use(express.static(path.join(__dirname, 'public')));

//Session middleware
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 4 * 3600 * 1000,
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);

//Passport middleware
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
