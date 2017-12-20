<?php
header("Content-Type:application/json");
require('../db/constants.php');
require('./sermon.class.php');
if ($_SERVER['REQUEST_METHOD'] !== 'POST'):
  $sermons = new Sermon;
  $sermons->type = "Audio";
  try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET'):
      $sermons->getSermons();
      $response['data'] = $sermons->result;
      $response['status'] = 200;
      $response['status_message'] = 'ok';
      header("HTTP/1.1 200");
    elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE'):
      $sermons->id = $_GET['id'];
      $sermons->deleteSermon();
      $response['data'] = $sermons->result;
      $response['status'] = 204;
      $response['status_message'] = 'ok';
      header("HTTP/1.1 204");
    endif;

    echo json_encode($response);
  } catch (exception $e) {
    $response['status'] = 500;
    $response['status_message'] = 'error';
    header("HTTP/1.1 500");
    echo json_encode($response);
  }
else:
  require('./upload.php');
  upload();
endif;
