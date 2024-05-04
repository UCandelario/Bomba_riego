let mysql = require("../db/mysql");

module.exports = {
  listar: (req, res) => {
    mysql.query("select * from planta", (err, rows, fields) => {
      if (err) res.json(err);
      else res.json(rows);
    });
  },
  eliminar: (req, res) => {
    const { id } = req.params;
    console.log(id)
    mysql.query('DELETE FROM planta WHERE Id = ?', id, (err, result) => {
      if (err) {
        res.json({ success: false, message: "Error al eliminar el planta", err });
      } else {
        if (result.affectedRows === 0) {
          res.json({ success: false, message: "Planta no encontrada" });
        } else {
          res.json({ success: true, message: "Planta eliminada exitosamente" });
        }
      }
    });
  },
  buscar: (req, res) => {
    const { id } = req.params;
    mysql.query('SELECT * FROM planta WHERE Id = ?', id, (err, result) => {
      if (err) {
        res.json({ success: false, message: "Error al buscar planta", err });
      } else {
        if (result.length === 0) {
          res.json({ success: false, message: "planta no encontrado" });
        } else {
          res.json({ success: true, message: "planta encontrado", data: result[0] });
        }
      }
    });
  },
  agregar: (req, res) => {
    const { nombre, nombre_propietario, tipo_planta } = req.body;
    console.log(nombre);
      const query = 'INSERT INTO planta (nombre, nombre_del_propietario, tipo_de_planta) VALUES (?, ?, ?)';
    mysql.query(query, [nombre, nombre_propietario, tipo_planta], (err, result) => {
      if (err) {
        res.json({ success: false, message: "Error al agregar la planta", err });
      } else {
        res.json({ success: true, message: "Planta agregado exitosamente", clientId: result.insertId });
      }
    });
  },
  editar: (req, res) => {
    const {id, nombre, nombre_propietario, tipo_planta } = req.body;
    const query = 'UPDATE clientes SET nombre = ?, nombre_del_propietario = ?, tipo_de_planta = ? WHERE id = ?';
    mysql.query(query, [nombre, nombre_propietario, tipo_planta, id], (err, result) => {
      if (err) {
        res.json({ success: false, message: "Error al editar la planta", err });
      } else {
        if (result.affectedRows === 0) {
          res.json({ success: false, message: "Planta no encontrada o los datos no cambiaron" });
        } else {
          res.json({ success: true, message: "Planta editada exitosamente" });
        }
      }
    });
  }
};
