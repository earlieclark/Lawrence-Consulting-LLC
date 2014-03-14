<?php

// Gathering Information from The User input

$name = $_POST['name'];
$email = $_POST['email'];
$msg = $_POST['message'];

$myAdd = "info@lawrenceconsultingllc.com";
$message = 'From: '.$name.' Email: '.$email.' Message: '.$msg;
$headers = 'From: '. $email . "\r\n";

// Contains the email parameters

$success = mail($myAdd, $message, $headers);

// Sends the email if a success
	if ($success) {
		echo "true";
	}  else {
		echo "false";
	}

?>