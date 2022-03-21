const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Follow = require('./follow')

const minAge = 1000 * 60 * 60 * 24 * 365 * 13 // 13 years
const emailPattern = /^[\w.-]+@[\w.-]+\.\w{2,4}$/
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // 1 uppercase letter, 1 lowercase letter, and 1 number
const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const usernamePattern = /^[a-z]{3,16}$/

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  phone: {
    type: String,
    required: false,
    match: [phonePattern, 'Please provide a valid phone number.']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailPattern, 'Please provide a valid email address.']
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return Date.now() - value >= minAge
      },
      message: 'You must be at least 13 years old to use this app.'
    }
  }, // Time in milliseconds
  username: {
    type: String,
    required: true,
    unique: true,
    match: [usernamePattern, 'Please provide a valid username.']
  },
  password: {
    type: String,
    required: true,
    match: [passwordPattern, 'Please provide a valid password.']
  }
},
{
  toJSON: {
    transform (_, ret) {
      delete ret.password
      delete ret.__v
    }
  }
})

async function authenticate (login, password) {
  const user = await this.findOne({ $or: [{ email: login }, { username: login }] })

  if (user && await bcrypt.compare(password, user.password)) return user

  return false
}

async function passwordHash () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
}

async function search (query) {
  return this.find({ username: { $regex: query } })
}

userSchema.static('authenticate', authenticate)
userSchema.static('search', search)

async function following (user) {
  return Follow.exists({ follower: this, user })
}

async function follow (user) {
  const isFollowing = await this.following(user)

  if (isFollowing) return false

  const newFollow = new Follow({ follower: this, user })

  await newFollow.save()
  return true
}

userSchema.method('following', following)
userSchema.method('follow', follow)

userSchema.pre('save', passwordHash)

module.exports = mongoose.model('User', userSchema)
