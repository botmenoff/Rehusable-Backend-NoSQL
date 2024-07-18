const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config(); // Cargar las variables de entorno
const port = process.env.PORT || 4000;

// Añadir middleware para que Express pueda procesar JSON
app.use(express.json());


// Importar las rutas
// const UserRoutes = require('./routes/User.routes.js');

// Usar las rutas
// const userRoutesPrefix = '/api';
// app.use(userRoutesPrefix, UserRoutes);

// Connectarse con la BBDD
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Empezar el servidor
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
