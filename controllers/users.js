const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  res.send('users controller')
})

module.exports = router;
