<?php

$nombre = $_POST['name'];
$mi_email = '';
$email = $_POST['email'];
$empresa = $_POST['empresa'];
$asunto =$_POST['subject'];

// Construir el mensaje en formato HTML
$mensajeHTML = '<p><strong>Nombre:</strong> ' . $nombre . '</p>';
$mensajeHTML .= '<p><strong>Email:</strong> ' . $email . '</p>';
$mensajeHTML .= '<p><strong>Empresa:</strong> ' . $empresa . '</p>';
$mensajeHTML .= '<p><strong>Mensaje:</strong> ' . $mensaje . '</p>';

// Cabeceras del correo para indicar que el contenido es HTML
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// Enviar el correo
$mail = mail($mi_email, $asunto, $mensajeHTML, $headers);

if ($mail) {
    echo 'ok';
} else {
    echo 'error';
}