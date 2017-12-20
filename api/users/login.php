<?php
header("Content-Type:application/json");
require('../db/constants.php');
require('./user.class.php');

$obj = file_get_contents('php://input');
$json = json_decode($obj);

$user = new User;
$user->username = $json->username;
$user->password = $json->password;
$user->login();

$response = array();

if (isset($user->result) && isset($user->result['kp_user'])):
  setcookie('username', $user->result['username'], time() + (86400 * 30));
  setcookie('guid', $user->result['guid'], time() + (86400 * 30));
  $response['data'] = $user->result;
  $response['status'] = 200;
  $response['status_message'] = 'ok';
  header("HTTP/1.1 200");
else:
  $response['data'] = $user->result;
  $response['status'] = 401;
  $response['status_message'] = 'unauthorized';
  header("HTTP/1.1 401");
endif;

echo json_encode($response);
