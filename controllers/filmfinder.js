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

router.get("/testsearch1", (req,res) =>{
  const lotr = [
  {
    title: "Lord of the Rings: The Fellowship of the Ring",
    poster: "https://drewreviewmovies.files.wordpress.com/2016/07/lordoftheringsthe01-thefellowshipofthering.jpg",
    genres: ["Adventure", "Drama", "Fantasy"],
    synopsis: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    scene_images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDAHxXYM03WZ9LK_-vom7VTozSSj2ygOzm5ggNNIHCUCH6oEQ7", "https://travisryanfilmblog.files.wordpress.com/2016/08/fellowship-of-the-ring.jpg", "http://parentpreviews.com/images/made/legacy-pics/lotr-fellowship-of-the-ring_668_330_80_int_s_c1.jpg"],
    trailer: "https://www.youtube.com/watch?v=V75dMMIW2B4",
    imdb_rating: 8.8,
    imdb_id: "tt0120737",
    release_date: "12-19-2001",
    cast: [{character: "Frodo Baggins", name: "Elijah Wood"}, {character: "Legolas", name: "Orlando Bloom"}],
    crew: [{job: "director", name: "Peter Jackson"}]
  },
  {
    title: "Lord of the Rings: The Two Towers",
    poster: "https://m.media-amazon.com/images/M/MV5BNGE5MzIyNTAtNWFlMC00NDA2LWJiMjItMjc4Yjg1OWM5NzhhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    genres: ["Adventure", "Drama", "Fantasy"],
    synopsis: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
    scene_images: ["https://www.whats-on-netflix.com/wp-content/uploads/2018/11/lord-of-the-rings-the-two-towers.jpeg","https://lh3.googleusercontent.com/_I5TmoX57runARTAZcGrXxaR376476-iy2mKcjovrJOp5s8g1t4_9kW2Xttfq4xE89oOVQ=w720-h405-rw", "https://www.unilad.co.uk/wp-content/uploads/2018/12/helms-deep.jpg"],
    trailer: "https://www.youtube.com/watch?v=LbfMDwc4azU",
    imdb_rating: 8.7,
    imdb_id: "tt0167261",
    release_date: "12-18-2002",
    cast: [{character: "Frodo Baggins", name: "Elijah Wood"}, {character: "Legolas", name: "Orlando Bloom"}],
    crew: [{job: "director", name: "Peter Jackson"}]
  },
  {
    title: "Lord of the Rings: The Return of the King",
    poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY1200_CR90,0,630,1200_AL_.jpg",
    genres: ["Adventure", "Drama", "Fantasy"],
    synopsis: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    scene_images: ["https://macmcentire.files.wordpress.com/2017/05/rotk4.jpg", "https://i.ytimg.com/vi/JB7fjEtzrsk/maxresdefault.jpg", "https://sleeplessthought.files.wordpress.com/2015/11/87_the_lord_of_the_rings_the_return_of_the_king.jpg?w=474&h=267"],
    trailer: "https://www.youtube.com/watch?v=r5X-hFf6Bwo",
    imdb_rating: 8.9,
    imdb_id: "tt0167260",
    release_date: "12-17-2003",
    cast: [{character: "Frodo Baggins", name: "Elijah Wood"}, {character: "Legolas", name: "Orlando Bloom"}],
    crew: [{job: "director", name: "Peter Jackson"}]
  }
]
  res.send(lotr)
})

router.get("/testsearch2", (req, res) =>{
  const aladdin = [
    {
      title: "Aladdin",
      poster: "https://i.pinimg.com/originals/ab/d6/be/abd6beb712ef72adf32acc94bb31607c.jpg",
      genres: ["Animation", "Adventure", "Comedy"],
      synopsis: "A kindhearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.",
      scene_images: ["https://i.ytimg.com/vi/wIGqHxwzjGA/maxresdefault.jpg", "https://i.ytimg.com/vi/s94HmtQwX7o/hqdefault.jpg", "https://cdn.newsapi.com.au/image/v1/64f4edbb13e62477becbe4648471b84d"],
      trailer: "https://www.youtube.com/watch?v=8HrmBXgiwDU",
      imdb_rating: 8.0,
      imdb_id: "tt0103639",
      release_date: "11-25-1992",
      cast: [{character: "Aladdin", name: "Scott Weinger"}, {character: "Jasmine", name: "Linda Larkin"}, {character: "Genie", name: "Robin Williams"}],
      crew: [{job: "director", name: "Ron Clements"}, {job: "director", name: "John Musker"}]
    },
    {
      title: "Aladdin",
      poster: "https://m.media-amazon.com/images/M/MV5BMjQ2ODIyMjY4MF5BMl5BanBnXkFtZTgwNzY4ODI2NzM@._V1_.jpg",
      genres: ["Adventure", "Comedy", "Family"],
      synopsis: "A kind-hearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.",
      scene_images: ["https://imgix.bustle.com/uploads/image/2019/5/22/f89631fa-fa79-419d-95ee-60ead1e89958-liveactionaladdin2.jpg?w=970&h=546&fit=crop&crop=faces&auto=format&q=70", "https://www.moviequotesandmore.com/wp-content/uploads/aladdin-2019-2.jpg", "https://i.ytimg.com/vi/ceSt3bYwP0A/maxresdefault.jpg"],
      trailer: "https://www.youtube.com/watch?v=JcMtWwiyzpU",
      imdb_rating: 7.4,
      imdb_id: "tt6139732",
      release_date: "05-24-2019",
      release_date: "11-25-1992",
      cast: [{character: "Aladdin", name: "Mena Mssoud"}, {character: "Jasmine", name: "Naomi Scott"}, {character: "Genie", name: "Will Smith"}],
      crew: [{job: "director", name: "Guy Ritchie"}]
    }
  ]
  res.send(aladdin)
})


router.get("/testsearch3", (req,res) =>{
  const titanic = [
    {
      title: "Titanic",
      poster: "https://cdn.shopify.com/s/files/1/1416/8662/products/titanic_1997_french_grande_original_film_art_2000x.jpg?v=1558250674",
      genres: ["Drama", "Romance"],
      synopsis: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
      scene_images: [],
      trailer: "",
      imdb_rating: 7.8,
      imdb_id: "tt0120338",
      cast: [{character: "Jack Dawson", name: "Leonardo DiCaprio"}, {character: "Rose Dewitt Bukater", name: "Kate Winslet"}],
      crew: [{job: "director", name: "James Cameron"}]
    }
  ]
  res.send(titanic)
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
