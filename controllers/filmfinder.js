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


/// test seed route////////////////////////////////////
router.get('/testseed', (req, res) => {

  Movie.create(testObject, (err, data) => {
    if (err) console.log(err);
    res.send(data)
  })
})

///// test route ////
router.get('/test', (req, res) => {

  Movie.find({}, (err, data) => {
    if (err) res.status(400).json({error: err.message})
    res.status(200).json(data)
  })
})

//////test add movie route //////////////////////////////////

router.get('/addMovieToUser/:id', (req, res) => {


  const newmovie = {title: '2001: A Space Odyssey', poster: '.jpg'}

  Movie.findByIdAndUpdate(req.params.id, {$push: {movies: newmovie}}, {new: true}, (err, data) => {
    if (err) {
      res.status(400).json({error:err.message})
    }
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
    }else{
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
  res.send('delete / route')
})

module.exports = router
