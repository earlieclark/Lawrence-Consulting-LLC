<?php

// Gathering Information from The User input
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

	$to = 'info@lawrenceconsultingllc.com';
	$subject = 'The Subject'.$subject;
	$message = 'From: '.$name.' Email: '.$email.' Message: '.$message;
	$headers = 'From: '. $email . "\r\n";

// Contains the email parameters

$success = mail($to, $message, $headers);

// Sends the email if a success
	if ($success) {
		echo "true";
	}  else {
		echo "false";
	}

?>