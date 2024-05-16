const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// Importar y utilizar las rutas
const router = require('./routes');
app.use('/api', router);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Nuevo middleware para analizar datos de formulario
app.use(cors());

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de middleware y rutas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "index.html"));
});

// Rutas para las páginas adicionales
app.get("/Agenda_riego.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "Agenda_riego.html"));
});

app.get("/Registro_planta.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "Registro_planta.html"));
});

app.get("/Mis_plantas.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "Mis_plantas.html"));
});

app.get("/Inicio.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "Inicio.html"));
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
