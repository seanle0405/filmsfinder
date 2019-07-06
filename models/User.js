const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  city: String,
  city_id: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
