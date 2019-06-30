const express = require('express')
const router = express.Router()

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
