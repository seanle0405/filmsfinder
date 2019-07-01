const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  userID: {type: String, required: true},
  name: {type: String},
  movies: [
      {
      title: {type: String, required: true, default: 'test'},
      poster: {type: String, required: true, default: '.jpg'}
    }
  ]
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
