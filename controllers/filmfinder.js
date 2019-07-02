const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie.js')

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
  Movie.find({} , (err, foundMovie) => {
    if(err){
      res.status(400).json({error : err.message})
    }
      res.status(200).json(foundMovie)
  })
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


router.post('/', (req, res) => {
 Movie.create(req.body, (error, createMovie) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).json(createMovie) //  .json() will send proper headers in response so client knows it's json coming back
  })
});

router.put('/', (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updateMovie) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(updateMovie)
  })
});

router.delete('/', (req, res) => {
 Movie.findByIdAndRemove(req.params.id, (err, deleteMovie) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.status(200).json(deleteMovie)
  })
})

module.exports = router
