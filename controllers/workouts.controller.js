const Workout = require('../models/Workout')

// Crear un workout
exports.createWorkout = async (req, res) => {
  try {
    const workout = new Workout({ ...req.body, user: req.user.id })
    await workout.save()
    res.status(201).json(workout)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el entrenamiento', error })
  }
}

// Obtener todos los workouts del usuario
exports.getUserWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id })
    res.json(workouts)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener los entrenamientos', error })
  }
}

// Obtener un workout por ID
exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
    if (!workout || workout.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Entrenamiento no encontrado' })
    }
    res.json(workout)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener el entrenamiento', error })
  }
}

// Editar un workout
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
    if (!workout || workout.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para editar este entrenamiento' })
    }

    Object.assign(workout, req.body)
    await workout.save()

    res.json(workout)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al actualizar el entrenamiento', error })
  }
}

// Eliminar un workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
    if (!workout || workout.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para eliminar este entrenamiento' })
    }

    await workout.deleteOne()
    res.json({ message: 'Entrenamiento eliminado' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar el entrenamiento', error })
  }
}
