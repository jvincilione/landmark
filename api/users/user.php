<?php
header("Content-Type:application/json");
require('../db/constants.php');
require('./user.class.php');

$user = new User;
$response = array();
try {
  if ($_SERVER['REQUEST_METHOD'] === 'GET'):
    $user->getUsers();
    $response['data'] = $user->result;
    $response['status'] = 200;
    $response['status_message'] = 'ok';
    header("HTTP/1.1 200");
  elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE'):
    $user->id = $_GET['id'];
    $user->deleteUser();
    $response['data'] = $user->result;
    $response['status'] = 204;
    $response['status_message'] = 'ok';
    header("HTTP/1.1 204");
  elseif ($_SERVER['REQUEST_METHOD'] === 'POST'):
    $obj = file_get_contents('php://input');
    $json = json_decode($obj);
    $user->username = $json->username;
    $user->password = $json->password;
    $user->addUser();

    $response['data'] = $user->result;
    $response['status'] = 200;
    $response['status_message'] = 'ok';
  endif;

  echo json_encode($response);
} catch (exception $e) {
  $response['status'] = 500;
  $response['status_message'] = 'error';
  header("HTTP/1.1 500");
  echo json_encode($response);
}
