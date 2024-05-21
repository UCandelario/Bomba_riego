<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permitir acceso desde cualquier origen
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Permitir métodos HTTP específicos
header('Access-Control-Allow-Headers: Content-Type'); // Permitir cabeceras específicas

$servername = "localhost";
$username = "root";
$password = "(Ur$07121998";
$dbname = "br_pruebas";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Eliminar el filtro por ID de planta
$sql = "SELECT fk_planta, fecha_riego, hora_riego FROM horario_riego WHERE fk_planta = 1";
$result = $conn->query($sql);

$datos = array();
while ($row = $result->fetch_assoc()) {
    $datos[] = $row;
}

$conn->close();

echo json_encode($datos);

