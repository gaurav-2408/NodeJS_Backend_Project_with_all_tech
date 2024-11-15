const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/product.route.js')
const dotenv = require('dotenv')
const logger = require('./logger.js')

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/products', productRoute)

// Test route
app.get("/", (req, res) => {
    res.json("Hello from node API")
})

console.log('MongoDB URL:', process.env.MONGO_DB_URL);
logger.error('an error occ from index.js')
// Database connection
mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log(`Connected to database`)

        // App connection
        app.listen(3000, () => {
            console.log(`Listening on port 3000`)
        })
    })
    .catch((error) => {
        console.error(`Database connection error: ${error.message}`);
    })
