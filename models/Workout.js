const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['running', 'gym', 'swimming', 'cycling', 'other'],
    default: 'other'
  },
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Workout', workoutSchema)
