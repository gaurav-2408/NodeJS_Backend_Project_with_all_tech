const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/product.route.js')

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use('/api/products', productRoute)

//test
app.get("/", (req, res)=>{
    res.json("Hello from node API")
})

//db connnection
mongoose.connect("mongodb+srv://gauravjain200024:root@learnmongodb.gmcpz.mongodb.net/learnMongoDb?retryWrites=true&w=majority&appName=LearnMongoDb")
.then(()=>{
    console.log(`connected to database`)

    //app connection
    app.listen(3000, ()=>{
        console.log(`port 3000`)
    })
}).catch(()=>{
    console.log(`database not connected`)
})

