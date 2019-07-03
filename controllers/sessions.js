const express = require('express')
const bcrypt = require('bcrypt')
const session = express.Router()
const User = require('../models/User.js')

session.get('/', (req, res) => {

})

module.exports = session
