# 📁 Proyecto: API REST AUTH - Gestión de Entrenamientos

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB Atlas**. Permite gestionar usuarios con autenticación JWT, roles (`user`, `admin`), entrenamientos (`workouts`) y ejercicios (`exercises`).

## 🛠 Tecnologías usadas

- Node.js
- Express
- MongoDB Atlas (Mongoose)
- JWT (Autenticación)
- bcryptjs
- dotenv
- cors
- nodemon

## 📦 Instalación

```bash
git clone https://github.com/PauPalacios7599/api-rest-auth.git
cd api-rest-auth
npm install
```

## ⚙️ Configuración del entorno

Crea un archivo `.env` en la raíz del proyecto con lo siguiente:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.xxxxx.mongodb.net/api-rest-auth?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta
```

## 📜 Scripts disponibles

| Comando        | Descripción                           |
| -------------- | ------------------------------------- |
| `npm run dev`  | Inicia el servidor en modo desarrollo |
| `npm start`    | Inicia el servidor en producción      |
| `npm run seed` | Carga datos de prueba en MongoDB      |

## 👥 Roles de usuario

- **user**: Accede solo a su información, entrenamientos y ejercicios.
- **admin**: Puede acceder a todos los usuarios y cambiar sus roles.

> 🔧 Nota: El primer usuario admin debe crearse manualmente desde MongoDB cambiando el campo `role` a `"admin"`.

## 📌 Endpoints

### 🔐 Auth (`/api/auth`)

| Método | Endpoint    | Descripción               |
| ------ | ----------- | ------------------------- |
| POST   | `/register` | Registro de usuario       |
| POST   | `/login`    | Login y generación de JWT |

### 👤 Usuarios (`/api/users`)

| Método | Endpoint    | Descripción                   | Rol necesario |
| ------ | ----------- | ----------------------------- | ------------- |
| GET    | `/`         | Obtener todos los usuarios    | admin         |
| PUT    | `/:id/role` | Cambiar rol de un usuario     | admin         |
| DELETE | `/:id`      | Eliminar usuario o a sí mismo | admin/user    |

### 🏋️ Workouts (`/api/workouts`)

| Método | Endpoint | Descripción                         |
| ------ | -------- | ----------------------------------- |
| POST   | `/`      | Crear un entrenamiento              |
| GET    | `/`      | Obtener entrenamientos del usuario  |
| GET    | `/:id`   | Obtener un entrenamiento específico |
| PUT    | `/:id`   | Actualizar un entrenamiento         |
| DELETE | `/:id`   | Eliminar un entrenamiento           |

### 💪 Exercises (`/api/exercises`)

| Método | Endpoint      | Descripción                      |
| ------ | ------------- | -------------------------------- |
| POST   | `/`           | Crear un ejercicio               |
| GET    | `/:workoutId` | Obtener ejercicios de un workout |
| PUT    | `/:id`        | Actualizar un ejercicio          |
| DELETE | `/:id`        | Eliminar un ejercicio            |

## 🌱 Datos de prueba (semilla)

```bash
npm run seed
```

Esto crea automáticamente:

- 👤 Usuario: `juanito@mail.com` / Contraseña: `123456`
- 🏋️ Entrenamiento de ejemplo
- 💪 Dos ejercicios asociados

## 📝 Notas

Este proyecto forma parte de una práctica backend y tiene como objetivo trabajar:

- ✅ Autenticación y autorización con JWT
- ✅ Rutas protegidas y control de permisos
- ✅ Relaciones entre colecciones en MongoDB
- ✅ Buenas prácticas en Express

## 👨‍💻 Autor

**Pau Palacios Gordillo**  
🔗 [GitHub - PauPalacios7599](https://github.com/PauPalacios7599)
