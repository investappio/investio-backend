const bcrypt = require('bcrypt')

const { Schema, model } = require('mongoose')
const Follow = require('./follow')
const Portfolio = require('./portfolio')

const minAge = 1000 * 60 * 60 * 24 * 365 * 13 // 13 years
const emailPattern = /^[\w.-]+@[\w.-]+\.\w{2,4}$/
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // 1 uppercase letter, 1 lowercase letter, and 1 number
const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const usernamePattern = /^[a-z]{3,16}$/

const userSchema = new Schema({
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
  },
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
  return this.find({ username: { $regex: query, $options: 'i' } })
}

userSchema.static('authenticate', authenticate)
userSchema.static('search', search)

async function following (user) {
  return Follow.exists({ follower: this, user })
}

async function follow (user) {
  const isFollowing = await this.following(user)

  if (isFollowing || this.username === user.username) return false

  const newFollow = new Follow({ follower: this, user })

  await newFollow.save()
  return true
}

async function unfollow (user) {
  const isFollowing = await this.following(user)

  if (!isFollowing || this.username === user.username) return false

  await Follow.findOneAndRemove({ follower: this, user })
}

async function getPortfolio () {
  const existing = await Portfolio.findOne({ user: this })

  const portfolio = existing || new Portfolio({ user: this })
  await portfolio.save()

  portfolio._doc.value = await portfolio.getValue()

  return portfolio
}

userSchema.method('getPortfolio', getPortfolio)
userSchema.method('following', following)
userSchema.method('unfollow', unfollow)
userSchema.method('follow', follow)

userSchema.pre('save', passwordHash)

module.exports = model('User', userSchema)
