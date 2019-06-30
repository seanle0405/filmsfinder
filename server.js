// requiring dependencies
require('dotenv').config()
const express = require('express')
// const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const env = require('dotenv')
const app = express()
const PORT = process.env.PORT;
const filmFinderController = require('./controllers/filmfinder')

// Mongoose connection setup

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))


mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
});

// Middlewares:
app.use(express.json());
app.use('/FilmFinder', filmFinderController)



// Listener:
app.listen(PORT, () => {
  console.log('now listening on backend port: 3003 ');
})
