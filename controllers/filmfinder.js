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


const formatMovies = (movies) =>{
  let data = []
      if(!movies){
        return data
      }
      for(let i = 0; i < movies.length; i++){
        const movie = {poster: ""}
        movie.title = movies[i].title
        if(movies[i].poster_image){
          if(movies[i].poster_image.image_files){
            let imageArr = movies[i].poster_image.image_files
            movie.poster = imageArr[imageArr.length-1].url
          }
        }
        if(movies[i].genres){
          let genresData = movies[i].genres
          let genresArr = []
          for(let i = 0; i < genresData.length; i++){
            genresArr.push(genresData[i].name)
          }
          movie.genres = genresArr
        }
        movie.synopsis = movies[i].synopsis
        if(movies[i].scene_images){
          let imageArr = []
          for(let j = 0; j < movies[i].scene_images.length; j++){
            let fileArr = movies[i].scene_images[j].image_files            
            imageArr.push(fileArr[fileArr.length - 1].url)
          }
         movie.scene_images = imageArr
        }
        if(movies[i].trailers){
          movie.trailer = movies[i].trailers[0].trailer_files[0].url
        }
        if(movies[i].ratings){
          if(movies[i].ratings.imdb){
            movie.imdb_rating = movies[i].ratings.imdb.value
          }
        }
        if(movies[i].release_dates){
          if(movies[i].release_dates.US){
            movie.release_dates = movies[i].release_dates.US[0].date
          }
        }
        movie.imdb_id = movies[i].imdb_id
        movie.cast = movies[i].cast
        movie.crew = movies[i].crew
        if(movie.title){
          data.push(movie)
        }       
      }
      return data
}


//Showtimes API search by title

router.get("/search/:title", (req, res) =>{
  request.get("https://api.internationalshowtimes.com/v4/movies?apikey=dHNYEAlSVxOXC4Eqy6b8aufIXC7utYnu&search_field=original_title&include_outdated=true&all_fields=true&search_query=" +req.params.title, {json: true}, (err, response, body) =>{
    if(err){
      res.send(err)
    }else{
        res.send(formatMovies(body.movies))
    }
    
  })

})

//Get recent releases from Showtimes API
router.get("/recent_releases", (req, res) =>{
  let cityId = 3945
  let releaseDate = '06-01-19'

  let showtimesBaseURL = `https://api.internationalshowtimes.com/v4/`
  let moviesParam = 'movies/'
  let timesParam = 'showtimes/'
  let showtimesAPIKey = `?apikey=dHNYEAlSVxOXC4Eqy6b8aufIXC7utYnu`
  let releaseDateParam = '&release_date_from=' + releaseDate
  let countryParam = `&countries=US`
  let fieldsParam = `&all_fields=true`
  let cityParam = `&city_ids=` + cityId

  let getRecentReleasesURL = showtimesBaseURL+moviesParam+showtimesAPIKey+releaseDateParam+countryParam+fieldsParam+cityParam

  request.get(getRecentReleasesURL, {json: true}, (err, response, body) =>{
    if(err){
      res.send(err)
    }else{
      res.send(formatMovies(body.movies))
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
