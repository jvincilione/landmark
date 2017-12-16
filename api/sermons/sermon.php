<?php
header("Content-Type:application/json");
require('../db/constants');
require('./sermon.class.php');

$sermons = new Sermon;
$sermons->type = "Audio";
$sermons->getSermons();
$sermonsArray = $sermons->result;


header("HTTP/1.1 200");

$response['status'] = 200;
$response['status_message'] = 'ok';
$response['data'] = $sermonsArray;

$json_response = json_encode($response);
echo $json_response;
