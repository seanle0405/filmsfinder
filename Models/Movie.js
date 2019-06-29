const mongoose = require('Mongoose')

const movieSchema = mongoose.Schema({
  name: {type: String, required: true}
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
