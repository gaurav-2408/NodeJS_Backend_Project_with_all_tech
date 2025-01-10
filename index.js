const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js');
const appLogRoute = require('./routes/applog.route.js');
const dotenv = require('dotenv');
const logger = require('./logger.js');
const passport = require('passport');
const cors = require('cors')
const sessionSecret = require('./security/sessionSecret.js');
const exp_session = require('express-session');
require('./security/auth.js');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const key = sessionSecret();

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure `express-session`
app.use(
  exp_session({
    secret: key || 'defaultSecret', // Use a strong secret
    resave: false, // Prevent unnecessary session saves
    saveUninitialized: false, // Don't save empty sessions
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Initialize Passport and use sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
//serialize user to login
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});


// Routes
app.use('/api/products', productRoute);
app.use('/api/applog', appLogRoute);

// For OAuth login and logout
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/dashboard.html');
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});
app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

// GitHub OAuth routes
app.get('/auth/github', passport.authenticate('github'));
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: true }),
  function (req, res) {
    res.redirect('/');
  }
);

console.log(key); //--> this works
console.log('MongoDB URL:', process.env.MONGO_DB_URL);
logger.error('An error occurred from index.js');

// Database connection
// mongoose
//   .connect(process.env.MONGO_DB_URL)
//   .then(() => {
//     console.log(`Connected to database`);

//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Listening on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error(`Database connection error: ${error.message}`);
//   });
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });