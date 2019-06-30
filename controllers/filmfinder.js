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
