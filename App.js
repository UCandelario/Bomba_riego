const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors());

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Importar y utilizar las rutas
const router = require('./routes');
app.use('/api', router);

// Configuración de middleware y rutas
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});