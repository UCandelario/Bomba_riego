<?php
header('Content-Type: application/json');
require 'db_config.php';

// Obtener el id de la planta del query string
$idPlanta = isset($_GET['id']) ? $_GET['id'] : '';

// Verificar si se proporcionó un id de planta válido
if (!empty($idPlanta)) {
    // Realizar la consulta para obtener los datos de la planta correspondiente
    $sql = "SELECT * FROM planta WHERE id_planta = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idPlanta);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Devolver los datos de la planta en formato JSON
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        // Devolver un mensaje de error si no se encontraron datos
        echo json_encode(array("error" => "No se encontraron datos de la planta."));
    }

    $stmt->close();
} else {
    // Devolver un mensaje de error si no se proporcionó un id de planta válido
    echo json_encode(array("error" => "No se proporcionó un ID de planta válido en el query string."));
}

$conn->close();
