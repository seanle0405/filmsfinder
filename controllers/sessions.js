const express = require('express')
const bcrypt = require('bcrypt')
const session = express.Router()
const User = require('../models/User.js')

session.post('/', (req, res) => {
  User.findOne(
    { username: req.body.username },
    (error, foundUser) => {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.status(200).json({foundUser: foundUser.username})
      } else {
        res.send('incorrect login info')
      }
    }
  )
})

session.delete('/', (req, res) => {
  req.session.destroy( () => {

  })
})

module.exports = session
