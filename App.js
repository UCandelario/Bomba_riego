const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importar y utilizar las rutas
const router = require('./routes');
app.use('/api', router);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de middleware y rutas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "Inicio.html"));
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

app.get("/Tipo_planta.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "Tipo_planta.html"));
});


app.get("/Inicio.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "Inicio.html"));
});

// Agregar la ruta POST para el formulario de registro de planta
app.post("/api/planta", (req, res) => {
  const appController = require('./controllers/appController');
  appController.agregar(req, res);
});


// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
