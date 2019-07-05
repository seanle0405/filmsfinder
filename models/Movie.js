const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  userID: {type: String, required: true},
  name: {type: String},
  city: {type: Number},
  movies: [
      {
      title: {type: String},
      poster: {type: String},
      genres: [String],
      synopsis: {type: String},
      scene_images: [String],
      trailer: String,
      imdb_rating: Number,
      imdb_id: String,
      release_date: String,
      cast: [{
      	id: String,
      	character: String,
      	name: String
      }],
      crew: [{
      	id: String,
      	name: String,
      	job: String
      }], 
      watched: {type: Boolean}
    }
  ]
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
