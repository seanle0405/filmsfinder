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
    if (err) {
      res.status(400).json({error: err.message})
    }
    console.log(data);
    res.status(200).json(data)
  })
})




router.post('/userInfo', (req, res) => {
  res.send('post / route')
});

router.put('/', (req, res) => {
  res.send('put / route')
});

router.delete('/', (req, res) => {
  res.send('delete / route')
})

module.exports = router
