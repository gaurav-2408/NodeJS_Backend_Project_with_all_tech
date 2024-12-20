const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/product.route.js')
const appLogRoute = require('./routes/applog.route.js')
const dotenv = require('dotenv')
const logger = require('./logger.js')
const passport = require('passport')
require('./auth.js');

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT

// Middleware
app.use(passport.initialize());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/products', productRoute)
app.use('/api/applog', appLogRoute)

//For Oauth we are making login and logout
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/dashboard.html')
}) 
app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/views/login.html')
}) 

app.get('/auth/github',
    passport.authenticate('github'));
  
app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login', session: false}),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
});

// passport.authenticate('github', { session: false }),
// (req, res) => {
//     res.json(req.user); // Handle the user directly without sessions
// }

console.log('MongoDB URL:', process.env.MONGO_DB_URL);
logger.error('an error occ from index.js')
// Database connection
// mongoose.connect(process.env.MONGO_DB_URL)
//     .then(() => {
//         console.log(`Connected to database`)

//         // App connection
//         app.listen(PORT, () => {
//             console.log(`Listening on port ${PORT}`)
//         })
//     })
//     .catch((error) => {
//         console.error(`Database connection error: ${error.message}`);
// })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
