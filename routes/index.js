let router = require('express').Router();

let clientes =  require('./clientes.js');
router.use('/clientes',clientes);


module.exports = router;