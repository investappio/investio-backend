const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const minAge = 1000 * 60 * 60 * 24 * 365 * 13 // 13 years
const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  phone: {
    type: String,
    required: false,
    minlength: 12,
    maxlength: 12
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
    minlength: 1,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

async function authenticate (email, password) {
  const user = await this.findOne({ email })

  if (user && await bcrypt.compare(password, user.password)) return user

  return false
}

async function passwordHash () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
}

userSchema.static('authenticate', authenticate)

userSchema.pre('save', passwordHash)
