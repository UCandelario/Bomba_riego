const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json()); 
app.use(cors());

let router = require('/routes');
app.use('/api', router); 
app.listen(3000, () => {
  console.log("Escuchando en puerto 3000")
});
