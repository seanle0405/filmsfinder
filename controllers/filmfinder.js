const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie.js')
const request = require("request")

const testObject = {
  userID: 'testUserName',
  name: 'User Name',
  movies: [
    {
      title: 'test title',
      poster: 'testposter.jpg'
    }
  ]
}

router.get('/', (req, res) => {
  res.send('get / route')
});




router.post('/addMovie', (req, res) => {
  const {username} = req.body
  const {movie} = req.body
  console.log('username:', username, 'movie: ', movie);
  Movie.findOneAndUpdate({userID: username}, {$push: {movies: movie}}, {new: true}, (err, data) => {
    if (err) {
      res.status(400).json({error:err.message})
    }
    console.log('sending data: ', data);
    res.status(200).json(data)
  })
})

////////////////////////////////////////

router.get('/getUser/:id', (req, res) => {
  Movie.find({userID: `${req.params.id}`}, (err, data) => {
    if (err) res.status(400).json({error: err.message})
    res.status(200).json(data)
  })
})



//Showtimes API search by title

router.get("/search/:title", (req, res) =>{
  request.get("https://api.internationalshowtimes.com/v4/movies?apikey=dHNYEAlSVxOXC4Eqy6b8aufIXC7utYnu&search_field=original_title&include_outdated=true&all_fields=true&search_query=" +req.params.title, {json: true}, (err, response, body) =>{
    if(err){
      res.send(err)
    } else {
      console.log(body);
      let data = []
      for(let i = 0; i < body.movies.length; i++){
        const movie = {poster: ""}
        movie.title = body.movies[i].title
        if(body.movies[i].poster_image){
          if(body.movies[i].poster_image.image_files){
            let imageArr = body.movies[i].poster_image.image_files
            movie.poster = imageArr[imageArr.length-1].url
          }
        }
        if(body.movies[i].genres){
          let genresData = body.movies[i].genres
          let genresArr = []
          for(let i = 0; i < genresData.length; i++){
            genresArr.push(genresData[i].name)
          }
          movie.genres = genresArr
        }
        if(movie.title){
          data.push(movie)
        }
      }
      res.send(data)
    }

  })

})


router.post('/', (req, res) => {
  res.send('post / route')
});

router.put('/', (req, res) => {
  res.send('put / route')
});




router.delete('/', (req, res) => {
  const id = req.body.movie._id;
  const {username} = req.body;
  console.log('id: ', id, 'user: ', username);
  Movie.findOneAndUpdate({userID: username}, {$pull: {movies: {_id: id}}}, {new:true}, (err, data) => {
    if (err) {
      res.status(400).json({error: err.message})
    }
    res.status(200).json(data)
  })

})

module.exports = router
