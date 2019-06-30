const mongoose = require('Mongoose')

const movieSchema = mongoose.Schema({
  title: {type: String, required: true},
  poster: {type: String, required: true},
  

})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
