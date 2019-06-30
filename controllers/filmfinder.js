const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie.js')

const testObject = {
  title: 'test title',
  poster: 'testposter.jpg'
}

router.get('/', (req, res) => {
  res.send('get / route')
});


/// test seed route
router.get('/testseed', (req, res) => {
  console.log('in test route');
  Movie.create(testObject, (err, data) => {
    if (err) console.log(err);
    res.send(data)
  })
})

///// test route ////
router.get('/test', (req, res) => {
  console.log('in test route');
  Movie.find({}, (err, data) => {
    if (err) res.status(400).json({error: err.message})
    res.status(200).json(data)
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
