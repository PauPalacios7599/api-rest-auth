const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Token inválido. Usuario no existe.' })
    }

    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json({ message: 'Token inválido.' })
  }
}

module.exports = auth
