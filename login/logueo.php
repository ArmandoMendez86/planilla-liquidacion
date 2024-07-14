<?php
session_start();

include 'conexion.php';

$usuario = $_POST['nombre'];
$clave = $_POST['password'];

$sentencia = "SELECT * FROM usuarios WHERE nick = '$usuario' and password = '$clave' ";
$ejecutar = $mysql->query($sentencia);


if (mysqli_num_rows($ejecutar) > 0) {
    $row = $ejecutar->fetch_assoc();
    $_SESSION['usuario'] = $row['nombre'];
    //echo 'usuario si existe';
    $estado = "UPDATE usuarios SET estado ='ONLINE' WHERE nick = '$usuario'";
    $ejecutar = $mysql->query($estado);
    header('location:../index.php');
} else {

    echo    '<div style="width: 80%;padding:20px;text-align:center;background-color:7ECBA1;color:white;font-size:25px;margin-top:200px;margin-left:auto;margin-right:auto;">
                Usuario o Contraseña incorrecta, intentalo de nuevo!!.
            </div>';
    header('refresh:3, index.html');
}
