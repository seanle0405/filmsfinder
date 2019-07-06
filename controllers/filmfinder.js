const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie.js')
const request = require("request")
const showtimesAPIKey = process.env.showtimesAPIKey
const guideboxAPIKey = process.env.guideboxAPIKey
const moment = require("moment")
const cities = require("../data/showtimesCities.js")

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
  console.log(username, ' username');
  Movie.findOneAndUpdate({userID: username}, {$push: {movies: movie}}, {new: true}, (err, data) => {
    if (err) {
      res.status(400).json({error:err.message})
    } else {
      console.log('sending data: ', data);
      res.status(200).json(data)
    }

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
        movie.showtimes_id = movies[i].id
        if(movie.title){
          data.push(movie)
        }
      }
      return data
}

const formatShowtimes = (showtimesArray, cityId) =>{
  let data = []
  if(!showtimesArray){
    return data
  }else if(showtimesArray.length === 0){
    return data
  }
  let cinema = {}
  cinema.cinema_id = showtimesArray[0].cinema_id
  cinema.cinema_name = ""
  cinema.showtimes = []
  for(let i = 0; i < showtimesArray.length; i++){
    if(cinema.cinema_id != showtimesArray[i].cinema_id){
      data.push(cinema)
      cinema = {}
      cinema.cinema_id = showtimesArray[i].cinema_id
      cinema.cinema_name = ""
      cinema.showtimes = []
    }
    const showtime = {}
    showtime.movie_id = showtimesArray[i].movie_id
    showtime.start_at = moment(showtimesArray[i].start_at).format("dddd, MMMM Do YYYY, h:mm a")
    showtime.booking_link = showtimesArray[i].booking_link
    if(showtime.movie_id){
      cinema.showtimes.push(showtime)
    }
  }
  data.push(cinema)
  
  return data
}
//Showtimes API search by title

router.get("/search/:title", (req, res) =>{
  request.get("https://api.internationalshowtimes.com/v4/movies?apikey="+showtimesAPIKey+"&search_field=original_title&include_outdated=true&all_fields=true&search_query=" +req.params.title, {json: true}, (err, response, body) =>{
    if(err){
      res.send(err)
    }else{
        res.send(formatMovies(body.movies))
    }
  })

})


//Get recent releases from Showtimes API
router.get("/recent_releases/:user_city", (req, res) =>{
  let cityId = req.params.user_city
  let releaseDate = moment().subtract(1, "months").format("MM-DD-YYYY")
  let showtimesBaseURL = `https://api.internationalshowtimes.com/v4/`
  let moviesParam = 'movies/'
  let timesParam = 'showtimes/'
  let APIKey = `?apikey=` + showtimesAPIKey
  let releaseDateParam = '&release_date_from=' + releaseDate
  let countryParam = `&countries=US`
  let fieldsParam = `&all_fields=true`
  let cityParam = `&city_ids=` + cityId

  let getRecentReleasesURL = showtimesBaseURL+moviesParam+APIKey+releaseDateParam+countryParam+fieldsParam+cityParam

  request.get(getRecentReleasesURL, {json: true}, (err, response, body) =>{
    if(err){
      res.send(err)
    }else{
      res.send(formatMovies(body.movies))
    }
  })

})

//Get Showtimes for movie 
router.get("/showtimes/:user_city/:movie_id", (req, res) =>{
  request.get("https://api.internationalshowtimes.com/v4/showtimes/?apikey="+showtimesAPIKey+"&movie_id="+req.params.movie_id+"&city_ids=" +req.params.user_city, {json: true}, (err, response, body) =>{
    if(err){
      res.send(err)
    }else{
      var showtimes = formatShowtimes(body.showtimes)
      request.get("https://api.internationalshowtimes.com/v4/cinemas/?apikey="+showtimesAPIKey+"&city_ids=" +req.params.user_city, {json: true}, (err, response, body) =>{
          if(err){
            console.log(err)
          }else{
            let cinemas = body.cinemas
            for(let i= 0; i < showtimes.length; i++){
              for(let j = 0; j < cinemas.length; j++){
                if(showtimes[i].cinema_id === cinemas[j].id){
                  showtimes[i].cinema_name = cinemas[j].name
                  break
                }
              }
            }
            res.send(showtimes)
          }
      })
    }
  })
})


//Guibox API calls
router.get("/sources/:imdb_id", (req,res) =>{
  request.get("http://api-public.guidebox.com/v2/search?api_key="+guideboxAPIKey+"&type=movie&field=id&id_type=imdb&query=" + req.params.imdb_id, {json: true}, (err, response, body) =>{
    if(err){
      res.send(err)
    }else{
      let guidebox_id = body.id
        request.get("http://api-public.guidebox.com/v2/movies/"+guidebox_id+"?api_key=" + guideboxAPIKey, {json: true}, (err, response, body) =>{
          if(err){
            res.send(err)
          }else{
            let sources = {}
            sources.subscription_sources = body.subscription_web_sources
            sources.purchase_sources = body.purchase_web_sources
            res.send(sources)
          }
        })
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
//^ this one up here should be findOneAndRemove() - BY MIT
module.exports = router
