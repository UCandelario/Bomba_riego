<?php
// Conectar a la base de datos
require 'db_config.php'; // Archivo separado con las credenciales de la base de datos

// Verificar si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $nombre_del_propietario = $_POST['nombre_del_propietario'];
    $nombre = $_POST['nombre'];
    $tipo_de_planta = $_POST['tipo_de_planta'];

    // Insertar los datos en la base de datos
    $sql = "INSERT INTO planta (nombre_del_propietario, nombre, tipo_de_planta) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nombre_del_propietario, $nombre, $tipo_de_planta);

    if ($stmt->execute()) {
        echo "Planta registrada exitosamente";
        echo '<meta http-equiv="refresh" content="0;url=http://localhost:3000/Registro_planta.html">';
    } else {
        echo "Error: " . $stmt->error;
        echo '<meta http-equiv="refresh" content="0;url=http://localhost:3000/Registro_planta.html">';
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Método no permitido";
    echo '<meta http-equiv="refresh" content="0;url=http://localhost:3000/Registro_planta.html">';
}
