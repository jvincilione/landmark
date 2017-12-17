<?php
header("Content-Type:application/json");

include "../../db/constants.php";
include "../sermon.class.php";

// set defaults
$allowed_filetypes = array('mp3');
// $max_filesize = 51200000; // Maximum filesize in BYTES (currently 50MB).
$folder_name = '../../../sermons-audio/';

$fileName = $_FILES['mp3']['name'];

// Get the extension from the filename.
$ext = pathinfo($fileName, PATHINFO_EXTENSION);

// Check if the filetype is allowed, if not DIE and inform the user.
if(!in_array($ext,$allowed_filetypes)):
  $die = true;
endif;

$title = $_POST['title'];
$date = $_POST['date'];

$downloadUrl = '/sermons-audio/' . strtolower(str_replace(' ', '-', preg_replace("/[^A-Za-z0-9 ]/", '', $title))) . '-' . $date;

if (strpos($date,'/') !== false) {
  $exp = explode('/', $date);
  $date = implode('-', $exp);
}

//set variables in Sermon class.
$sermon = new Sermon;
$sermon->title = $title;
$sermon->sermon_date = $date;
$sermon->speaker = $_POST['speaker'];
$sermon->type = "Audio";

if(!file_exists($downloadUrl) && !isset($die)):
  if(move_uploaded_file($_FILES["mp3"]["tmp_name"], $downloadUrl)):
    $sermon->downloadUrl = $downloadUrl;
  endif;
endif;

//run addSermon() method from Items class to add item and category to item.
$sermon->addSermon();

$result = $sermon->result;

if (isset($result) && $result = "Success" && !isset($die)):
  header("HTTP/1.1 200");

  $sermon->getSermons();

  $response['status'] = 200;
  $response['status_message'] = 'ok';
  $response['data'] = $sermon->result;

  $json_response = json_encode($response);
  echo $json_response;
else:
  header("HTTP/1.1 500");

  $response['status'] = 500;
  $response['status_message'] = 'There was an error';
  $response['data'] = $sermon->result;

  $json_response = json_encode($response);
  echo $json_response;
  exit();
endif;
