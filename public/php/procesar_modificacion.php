<?php
require 'db_config.php'; // Archivo separado con las credenciales de la base de datos

// Obtener los datos del formulario
$idPlanta = $_POST['id_planta'];
$nombrePropietario = $_POST['nombre_del_propietario'];
$nombre = $_POST['nombre'];
$tipoDePlanta = $_POST['tipo_de_planta'];

// Verificar si se proporcionaron todos los datos necesarios
if (!empty($idPlanta) && !empty($nombrePropietario) && !empty($nombre) && !empty($tipoDePlanta)) {
    // Actualizar los datos de la planta en la base de datos
    $sql = "UPDATE planta SET nombre_del_propietario = ?, nombre = ?, tipo_de_planta = ? WHERE id_planta = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $nombrePropietario, $nombre, $tipoDePlanta, $idPlanta);

    if ($stmt->execute()) {
        // Redirigir a la página Mis_plantas con un mensaje de éxito
        header("Location: http://localhost:3000/Mis_plantas.html?mensaje=Actualización realizada correctamente");
        exit();
    } else {
        // Redirigir a la página Mis_plantas con un mensaje de error
        header("Location: http://localhost:3000/Mis_plantas.html?mensaje=Error al realizar la actualización");
        exit();
    }

    $stmt->close();
} else {
    // Redirigir a la página Mis_plantas con un mensaje de error
    header("Location: http://localhost:3000/Mis_plantas.html?mensaje=Por favor, complete todos los campos del formulario");
    exit();
}

$conn->close();

