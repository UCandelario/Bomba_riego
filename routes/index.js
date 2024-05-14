const router = require('express').Router();

// Importar y utilizar las rutas específicas
const plantaRoutes = require('./planta');
router.use('/planta', plantaRoutes);

module.exports = router;
