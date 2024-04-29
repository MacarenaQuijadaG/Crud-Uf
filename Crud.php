<?php

$conexion = new PDO("mysql:host=127.0.0.1;dbname=indicadores", "root", "");
$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


function obtenerIndicadores($conexion) {
    $query = "SELECT * FROM indicadores_uf";
    $statement = $conexion->prepare($query);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}


function insertarIndicador($conexion, $fecha, $valor) {
    $query = "INSERT INTO indicadores_uf (fecha, valor) VALUES (:fecha, :valor)";
    $statement = $conexion->prepare($query);
    return $statement->execute(array(':fecha' => $fecha, ':valor' => $valor));
}


switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode(obtenerIndicadores($conexion));
        break;
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode(insertarIndicador($conexion, $data['fecha'], $data['valor']));
        break;
}
?>
