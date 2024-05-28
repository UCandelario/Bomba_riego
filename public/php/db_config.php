<?php
$servername = "localhost";
$username = "root";
$password = "Nacien1990";
$dbname = "br_pruebas";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

