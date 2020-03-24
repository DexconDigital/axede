<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, X-Auth-Token, Origin, Authorization');
/**
 * This example shows making an SMTP connection with authentication.
 */

require 'class.phpmailer.php';
require 'class.smtp.php';

$msg=$_POST['query'];
//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
// if you're using SSL
$mail->SMTPSecure = 'ssl';
//Set the hostname of the mail server
$mail->Host = "cloud.nextgenerationwebhost.com";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 465;
//Username to use for SMTP authentication
$mail->Username = "contacto@aplicando.com.co";
//Password to use for SMTP authentication
$mail->Password = "Lidaju@30";
//Set who the message is to be sent from
$mail->setFrom('contacto@aplicando.com.co', 'Mi Contacto');
//Set the subject line
$mail->Subject = "INSERTAR ASISTCOLE";
//mensaje
$mail->MsgHTML($msg);
//Set who the message is to be sent to
$mail->addAddress('danyiel93@gmail.com', 'Daniel Jimenez');
//pasa a html
$mail->IsHTML(true);

//send the message, check for errors
if (!$mail->send()) {
// if (true) {
    echo json_encode(array('res' => false,'mensaje' => $mail->ErrorInfo));
} else {
    echo json_encode(array('res' => true));
}
