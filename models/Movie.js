const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  userID: {type: String, required: true},
  name: {type: String},
  movies: [
      {
      title: {type: String},
      poster: {type: String},
      watched: {type: Boolean}
    }
  ]
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
