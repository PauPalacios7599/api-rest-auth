const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'No tienes permisos suficientes' })
    }
    next()
  }
}

module.exports = checkRole
