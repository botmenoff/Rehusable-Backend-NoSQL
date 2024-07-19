// Dependencias
const express = require('express');
const router = express.Router();

// Archivos
const UserController = require('../controllers/user.controller.js')

// Rutas
router.get('/user/get', UserController.getAll);

module.exports = router;