<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modificar Planta</title>
    <link rel="icon" href="http://localhost:3000/Images/Logo_2.jpeg" type="image/jpeg">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">


    <link rel="stylesheet" type="text/css" href="http://localhost:3000/css/modif_planta.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

</head>
<body>
<nav class="navbar" style="background-color: #e3f2fd;">
        <img src="http://localhost:3000/Images/Logo.jpeg" alt="Logo" style="height: 90px">
        <a class="navbar-brand" href="Inicio.html"></a>
    
        <ul class="navbar-nav d-flex flex-row">
            <li class="nav-item"><a class="nav-link" href="http://localhost:3000/Inicio.html"> <i class="fas fa-leaf"></i> Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="http://localhost:3000/Tipo_de_planta.html"> <i class="fas fa-leaf"></i> Tipos de plantas</a></li>
            <li class="nav-item"><a class="nav-link" href="http://localhost:3000/Registro_planta.html"> <i class="fas fa-leaf"></i> Registro de planta</a></li>
            <li class="nav-item"><a class="nav-link" href="http://localhost:3000/mis_plantas.html"> <i class="fas fa-leaf"></i> Mis plantas</a></li>
            <li class="nav-item"><a class="nav-link" href="http://localhost:3000/Agenda_riego.html"> <i class="fas fa-leaf"></i> Agenda de riego de mis plantas</a></li>
        </ul>
    </nav>

    <div class="img_planti">
            <img src="https://i.pinimg.com/originals/c0/5a/4c/c05a4c88320d01df93c049368d2c4c5a.gif" alt="planti">
        </div>

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
                echo '<input type="submit" class="btn btn-outline-success" value="Guardar Cambios">';
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

    <div class="finito">
        <img src="https://i.pinimg.com/originals/18/f7/6e/18f76ecb111c75b4c4a40106a2985745.gif" alt="pixel_plant">
    </div>

    <footer>
        <p>Sistema de Riego - Todos los derechos reservados</p>
    </footer>
</body>
</html>
