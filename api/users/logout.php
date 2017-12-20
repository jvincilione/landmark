<?php
header("Content-Type:application/json");

setcookie('lbc-username', '', time() - 3600);
setcookie('lbc-guid', '', time() - 3600);
$response['status'] = 205;
$response['status_message'] = 'ok';
header("HTTP/1.1 205");

echo json_encode($response);
