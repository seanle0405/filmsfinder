// requiring dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = express()
const PORT = process.env.PORT;

// Mongoose connection setup
//
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'
//
// mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
// mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))
//
//
// mongoose.connect('mongodb://localhost:27017/bookmarks', { useNewUrlParser: true })
// mongoose.connection.once('open', ()=>{
//     console.log('connected to mongoose...')
// });

// Middlewares:
app.use(express.json())

// Routes:
app.get('/', (req, res) => {
  res.send('get / route')
})

// Listener:
app.listen(PORT, () => {
  console.log('now listening on backend port: 3003 ');
})
