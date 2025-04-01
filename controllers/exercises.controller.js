const Exercise = require('../models/Exercise')
const Workout = require('../models/Workout')

// Crear ejercicio y asociarlo a un workout
exports.createExercise = async (req, res) => {
  const { name, sets, reps, restTime, workout } = req.body

  try {
    const foundWorkout = await Workout.findById(workout)
    if (!foundWorkout || foundWorkout.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'No puedes añadir ejercicios a este entrenamiento' })
    }

    const newExercise = new Exercise({ name, sets, reps, restTime, workout })
    await newExercise.save()

    res.status(201).json(newExercise)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear ejercicio', error })
  }
}

// Obtener todos los ejercicios de un workout
exports.getExercisesByWorkout = async (req, res) => {
  const { workoutId } = req.params

  try {
    const exercises = await Exercise.find({ workout: workoutId })
    res.json(exercises)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ejercicios', error })
  }
}

// Editar ejercicio
exports.updateExercise = async (req, res) => {
  const { id } = req.params

  try {
    const exercise = await Exercise.findById(id).populate('workout')

    if (!exercise || exercise.workout.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'No puedes editar este ejercicio' })
    }

    Object.assign(exercise, req.body)
    await exercise.save()

    res.json(exercise)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar ejercicio', error })
  }
}

// Eliminar ejercicio
exports.deleteExercise = async (req, res) => {
  const { id } = req.params

  try {
    const exercise = await Exercise.findById(id).populate('workout')

    if (!exercise || exercise.workout.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'No puedes eliminar este ejercicio' })
    }

    await exercise.deleteOne()
    res.json({ message: 'Ejercicio eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar ejercicio', error })
  }
}
