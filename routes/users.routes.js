const express = require('express')
const router = express.Router()
const {
  getUsers,
  changeUserRole,
  deleteUser
} = require('../controllers/users.controller')

const auth = require('../middleware/auth')
const checkRole = require('../middleware/role')

// Obtener todos los usuarios
router.get('/', auth, checkRole('admin'), getUsers)

// Cambiar rol de un usuario
router.put('/:id/role', auth, checkRole('admin'), changeUserRole)

// Eliminar usuario
router.delete('/:id', auth, deleteUser)

module.exports = router
