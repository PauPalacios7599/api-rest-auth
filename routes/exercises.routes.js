const express = require('express')
const router = express.Router()

const {
  createExercise,
  getExercisesByWorkout,
  updateExercise,
  deleteExercise
} = require('../controllers/exercises.controller')

const auth = require('../middleware/auth')

router.post('/', auth, createExercise)
router.get('/:workoutId', auth, getExercisesByWorkout)
router.put('/:id', auth, updateExercise)
router.delete('/:id', auth, deleteExercise)

module.exports = router
