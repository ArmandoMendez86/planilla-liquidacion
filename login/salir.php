<?php
include 'conexion.php';

session_start();

$usuario = $_SESSION['usuario'];
$estado = "UPDATE usuarios SET estado ='OFFLINE' WHERE nombre = '$usuario'";
$ejecutar = $mysql->query($estado);
session_destroy();

header('location: index.html');
exit();
