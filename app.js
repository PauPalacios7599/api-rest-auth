require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// Importación de rutas
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/users.routes')
const workoutRoutes = require('./routes/workouts.routes')
const exerciseRoutes = require('./routes/exercises.routes')

//  Middlewares
app.use(cors())
app.use(express.json())

// Rutas base
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/exercises', exerciseRoutes)

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas')
    app.listen(process.env.PORT, () => {
      console.log(
        `🚀 Servidor corriendo en http://localhost:${process.env.PORT}`
      )
    })
  })
  .catch((err) => {
    console.error('❌ Error al conectar con MongoDB:', err)
  })
