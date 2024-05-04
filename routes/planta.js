const express = require("express");
const appController = require("../controllers/appController");
const router = express.Router();

router.get("/", (req, res) => {
  appController.listar(req, res);
});

router.get("/:id", (req, res) => {
  appController.buscar(req, res);
});

router.post("/", (req, res) => {
  appController.agregar(req, res);
});

router.delete("/:id", (req, res) => {
  appController.eliminar(req, res);
});

router.put("/:id", (req, res) => {
  appController.editar(req, res);
});

module.exports = router;
