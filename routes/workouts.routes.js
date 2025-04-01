const express = require('express')
const router = express.Router()

const {
  createWorkout,
  getUserWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout
} = require('../controllers/workouts.controller')

const auth = require('../middleware/auth')

// Rutas protegidas
router.post('/', auth, createWorkout)
router.get('/', auth, getUserWorkouts)
router.get('/:id', auth, getWorkoutById)
router.put('/:id', auth, updateWorkout)
router.delete('/:id', auth, deleteWorkout)

module.exports = router
