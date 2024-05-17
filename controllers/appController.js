// appController.js
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
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Los datos del formulario están vacíos" });
        }
        const { nombre_del_propietario, nombre, tipo_de_planta } = req.body;
        const propietario = nombre_del_propietario || 'Sin propietario';
        const planta = nombre || 'Sin nombre';
        const tipo = tipo_de_planta || 'Sin tipo';
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
        const id = req.params.id; // Obtener el ID de la planta de los parámetros de la solicitud
        const { nombre_del_propietario, nombre, tipo_de_planta } = req.body; // Obtener otros datos del cuerpo de la solicitud
    
        console.log("ID de la planta a editar:", id); // Verificar el ID de la planta
    
        mysql.query('UPDATE planta SET nombre_del_propietario = ?, nombre = ?, tipo_de_planta = ? WHERE id_planta = ?', 
            [nombre_del_propietario, nombre, tipo_de_planta, id], 
            (err, result) => {
                if (err) {
                    console.error("Error al actualizar la planta:", err);
                    res.status(500).json({ success: false, message: "Error al actualizar la planta", err });
                } else {
                    if (result.affectedRows === 0) {
                        console.log("Planta no encontrada o los datos no cambiaron");
                        res.json({ success: false, message: "Planta no encontrada o los datos no cambiaron" });
                    } else {
                        console.log("Planta actualizada exitosamente");
                        res.json({ success: true, message: "Planta actualizada exitosamente" });
                    }
                }
            }
        );
    }
    
};
