const GitHubStrategy = require('passport-github').Strategy;
const passport  = require('passport')
const dotenv = require('dotenv')
dotenv.config()

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID.toString(),
    clientSecret: process.env.CLIENT_SECRET.toString(),
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
        console.log(profile)
        cb(err, user);
    });
  }
));