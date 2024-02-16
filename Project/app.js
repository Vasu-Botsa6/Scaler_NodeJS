const express = require('express')
const mongoose = require('mongoose')
const categories = require('./Routes/categories')

mongoose.connect('mongodb://127.0.0.1/learning@Platform')
.then(()=>console.log("connection is successful"))
.catch(err => console.error("could not connect to mongoDB",err))

const app = express()
app.use(express.json())
app.use(categories)



const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`server is running on port ${port}`))