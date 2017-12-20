<?php
header("Content-Type:application/json");
require('./db/constants.php');
require('./users/user.class.php');

$obj = file_get_contents('php://input');
$json = json_decode($obj);

$user = new User;
$user->username = $json['username'];
$user->password = $json['password'];
$user->login();

$response['data'] = $user->result;
$response['status'] = 200;
$response['status_message'] = 'ok';
header("HTTP/1.1 200");

echo json_encode($response);
