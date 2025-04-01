require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')
const Workout = require('../models/Workout')
const Exercise = require('../models/Exercise')

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Conectado a MongoDB para hacer la seed')

    await User.deleteMany()
    await Workout.deleteMany()
    await Exercise.deleteMany()

    const user = new User({
      username: 'juanito',
      email: 'juanito@mail.com',
      password: '123456'
    })
    await user.save()

    const workout = new Workout({
      title: 'Piernas potentes',
      description: 'Entreno de fuerza para piernas',
      type: 'gym',
      duration: 60,
      user: user._id
    })
    await workout.save()

    const exercises = [
      {
        name: 'Sentadillas',
        sets: 4,
        reps: 12,
        restTime: 60,
        workout: workout._id
      },
      {
        name: 'Prensa',
        sets: 3,
        reps: 10,
        restTime: 45,
        workout: workout._id
      }
    ]

    await Exercise.insertMany(exercises)

    console.log('🌱 Seed completada con éxito')
    process.exit()
  } catch (error) {
    console.error('❌ Error en la seed:', error)
    process.exit(1)
  }
}

runSeed()
