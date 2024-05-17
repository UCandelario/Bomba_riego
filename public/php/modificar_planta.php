<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modificar Planta</title>
    <link rel="icon" href="/public/images/Logo_2.jpeg" type="image/jpeg">
    <link rel="stylesheet" href="/public/css/style.css">
</head>
<body>
    <nav>
        <ul>
            <li><a href="http://localhost:3000/Inicio.html">Inicio</a></li>
            <li><a href="http://localhost:3000/Registro_planta.html">Registro de planta</a></li>
            <li><a href="http://localhost:3000/Mis_plantas.html">Mis plantas</a></li>
            <li><a href="http://localhost:3000/Agenda_riego.html">Agenda de riego de mis plantas</a></li>
        </ul>
    </nav>

    <div class="contenido">
        <h1>Modificar Planta</h1>
        <?php
        // Obtener el id de la planta del query string
        $idPlanta = isset($_GET['id']) ? $_GET['id'] : '';
        
        // Verificar si se proporcionó un id de planta válido
        if (!empty($idPlanta)) {
            // Realizar la consulta para obtener los datos de la planta correspondiente
            require 'db_config.php'; // Archivo separado con las credenciales de la base de datos

            $sql = "SELECT * FROM planta WHERE id_planta = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $idPlanta);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                // Llenar los campos del formulario con los datos de la planta
                $row = $result->fetch_assoc();
                echo '<form action="procesar_modificacion.php" method="post" id="modificarPlantaForm">';
                echo '<input type="hidden" id="id_planta" name="id_planta" value="' . $row['id_planta'] . '">';
                echo '<label for="nombre_del_propietario">Nombre del Propietario:</label><br>';
                echo '<input type="text" id="nombre_del_propietario" name="nombre_del_propietario" value="' . $row['nombre_del_propietario'] . '" required><br><br>';
                echo '<label for="nombre">Nombre de la Planta:</label><br>';
                echo '<input type="text" id="nombre" name="nombre" value="' . $row['nombre'] . '" required><br><br>';
                echo '<label for="tipo_de_planta">Tipo de Planta:</label><br>';
                echo '<select id="tipo_de_planta" name="tipo_de_planta" required>';
                // Opciones del select
                $options = array("arbol", "arbusto", "hierbas", "plantas_suculentas", "plantas_trepadoras", "higuerones", "helechos", "musgos", "hepáticas", "insectivoras");
                foreach ($options as $option) {
                    if ($row['tipo_de_planta'] === $option) {
                        echo '<option value="' . $option . '" selected>' . ucwords(str_replace("_", " ", $option)) . '</option>';
                    } else {
                        echo '<option value="' . $option . '">' . ucwords(str_replace("_", " ", $option)) . '</option>';
                    }
                }
                echo '</select><br><br>';
                echo '<input type="submit" value="Guardar Cambios">';
                echo '</form>';
            } else {
                echo '<p>No se encontraron datos de la planta.</p>';
            }
            $stmt->close();
            $conn->close();
        } else {
            echo '<p>No se proporcionó un ID de planta válido en el query string.</p>';
        }
        ?>
    </div>

    <footer>
        <p>Sistema de Riego - Todos los derechos reservados</p>
    </footer>
</body>
</html>
