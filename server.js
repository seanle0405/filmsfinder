// requiring dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const bcrypt = require('bcrypt')
const env = require('dotenv')
const app = express()
const PORT = process.env.PORT;
const filmFinderController = require('./controllers/filmfinder')

// Mongoose connection setup



const MONGODB_URI = process.env.MONGODB_URI ||'mongodb://localhost:27017/filmfinder'

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connect('mongodb://localhost:27017/filmfinder', { useNewUrlParser: true , useFindAndModify: false});
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
});

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
      // currently setting else to return info anyway so that we can temporarily view endpoints in browser. once front end functionality is set up, will block access to non whitelisted origins

      // callback(new Error('Not allowed by CORS lol'))
    }
  }
}



// Middlewares:
app.use(cors(corsOptions))
app.use(express.json());
app.use('/FilmFinder', filmFinderController)
app.use(session({
  secret: "moviebuff", //this needs to move to .env
  resave: false,
  saveUninitialized: false
}))





// Listener:
app.listen(PORT, () => {
  console.log('now listening on backend port: 3003 ');
})
