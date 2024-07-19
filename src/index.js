// Importaciones
const mongoConnection = require('./config/database.connection') // Llamando a este archivo se hace la conexión
const express = require('express');
const app = express();
require('dotenv').config(); // Cargar las variables de entorno
const port = process.env.PORT || 4000;

// Añadir middleware para que Express pueda procesar JSON
app.use(express.json());

// Hacer la conexion con mongoDB
// mongoConnection.run()

// Importar las rutas
// const UserRoutes = require('./routes/User.routes.js');

// Usar las rutas
// const userRoutesPrefix = '/api';
// app.use(userRoutesPrefix, UserRoutes);

// Connectarse con la BBDD

// Empezar el servidor
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
