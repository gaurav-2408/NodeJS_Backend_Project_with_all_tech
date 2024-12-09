const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/product.route.js')
const appLogRoute = require('./routes/applog.route.js')
const dotenv = require('dotenv')
const logger = require('./logger.js')

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/products', productRoute)
app.use('/api/applog', appLogRoute)

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
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error(`Database connection error: ${error.message}`);
})
