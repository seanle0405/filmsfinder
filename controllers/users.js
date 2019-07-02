const express = require('express')
const users = express.Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

users.get('/', (req, res) => {
  User.find({}, (error, foundUser) => {
    if (error) {
      res.status(400).json({error: error.message})
    }
      res.status(200).json(foundUser)
  })
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.gensaltSync(15))
  User.create(req.body, (error, createdUser) => {
    if (error) {
      res.status(400).json({error: error.message})
    } 
      res.status(200).json(createdUser)
  })
})

module.exports = router;
