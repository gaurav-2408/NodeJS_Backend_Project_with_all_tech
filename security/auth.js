const GitHubStrategy = require('passport-github').Strategy;
const passport  = require('passport')
const dotenv = require('dotenv')
dotenv.config()

//passport setup
passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log("GitHub Profile:", profile); // Debugging purposes
    cb(null, profile); // Pass the profile directly
  }
));
