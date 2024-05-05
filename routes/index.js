let router = require('express').Router();

let planta =  require('../planta.js');
router.use('../planta',planta);


module.exports = router;