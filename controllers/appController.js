let mysql = require("../db/mysql");

module.exports = {
  
  listar: (req, res) => {
    mysql.query("SELECT * FROM planta", (err, rows, fields) => {
      if (err) res.json(err);
      else res.json(rows);
    });
  },

  eliminar: (req, res) => {
    const { id } = req.params;
    mysql.query('DELETE FROM planta WHERE id_planta = ?', id, (err, result) => {
      if (err) {
        res.json({ success: false, message: "Error al eliminar la planta", err });
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
    mysql.query('SELECT * FROM planta WHERE id_planta = ?', id, (err, result) => {
      if (err) {
        res.json({ success: false, message: "Error al buscar planta", err });
      } else {
        if (result.length === 0) {
          res.json({ success: false, message: "Planta no encontrada" });
        } else {
          res.json({ success: true, message: "Planta encontrada", data: result[0] });
        }
      }
    });
  },

  agregar: (req, res) => {
    // Obtener los datos del formulario
    const { nombre_del_propietario, nombre, tipo_de_planta } = req.body;

    // Verificar si los valores son nulos y asignar valores predeterminados si es necesario
    const propietario = nombre_del_propietario ? nombre_del_propietario : 'Sin propietario';
    const planta = nombre ? nombre : 'Sin nombre';
    const tipo = tipo_de_planta ? tipo_de_planta : 'Sin tipo';

    // Realizar la inserción en la base de datos
    const query = 'INSERT INTO planta (nombre_del_propietario, nombre, tipo_de_planta) VALUES (?, ?, ?)';
    mysql.query(query, [propietario, planta, tipo], (err, result) => {
        if (err) {
            console.error("Error al agregar la planta:", err);
            res.status(500).json({ success: false, message: "Error al agregar la planta", err });
        } else {
            res.json({ success: true, message: "Planta agregada exitosamente", clientId: result.insertId });
        }
    });
},



  editar: (req, res) => {
    const { id, nombre, nombre_propietario, tipo_de_planta } = req.body || {};
    const query = 'UPDATE planta SET nombre = ?, nombre_del_propietario = ?, tipo_de_planta = ? WHERE id_planta = ?';
    mysql.query(query, [nombre, nombre_propietario, tipo_de_planta, id], (err, result) => {
      if (err) {
        res.status(500).json({ success: false, message: "Error al editar la planta", err });
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
