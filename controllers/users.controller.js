const User = require('../models/User')

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error })
  }
}

exports.changeUserRole = async (req, res) => {
  const { id } = req.params
  const { role } = req.body

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Rol inválido' })
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password')
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    res.json({ message: 'Rol actualizado', user })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el rol', error })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params

  // Un user solo puede eliminarse a sí mismo
  if (req.user.role !== 'admin' && req.user.id !== id) {
    return res
      .status(403)
      .json({ message: 'No tienes permisos para eliminar este usuario' })
  }

  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    res.json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error })
  }
}
