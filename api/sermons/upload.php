<?php
function upload() {
  $response = array();

  // this file is included in another file that requires the User class,
  // so it is available in this scope as well
  $user = new User;
  $user->username = $_COOKIE['lbc-username'];
  $user->guid = urldecode($_COOKIE['lbc-guid']);
  if (!$user->isCookieValid()):
    $response['status'] = 401;
    $response['status_message'] = 'unauthorized';
    echo $user->isCookieValid();
    header("HTTP/1.1 401");
  else:
    // set defaults
    $allowed_filetypes = array('mp3');
    // $max_filesize = 51200000; // Maximum filesize in BYTES (currently 50MB).
    $folder_name = '../../../sermons-audio/';

    $fileName = $_FILES['file']['name'][0];

    // Get the extension from the filename.
    $ext = pathinfo($fileName, PATHINFO_EXTENSION);

    // Check if the filetype is allowed, if not DIE and inform the user.
    if(!in_array($ext, $allowed_filetypes)):
      $die = true;
    endif;

    $title = $_POST['title'];
    $date = $_POST['date'];

    $downloadUrl = '../sermons-audio/' . $date  . '-' .  strtolower(str_replace(' ', '-', preg_replace("/[^A-Za-z0-9 ]/", '', $title))) . '.mp3';

    if (strpos($date,'/') !== false) {
      $exp = explode('/', $date);
      $date = implode('-', $exp);
    }

    //set variables in Sermon class.
    // this file is included in another file that requires the Sermon class,
    // so it is available in this scope as well
    $sermon = new Sermon;
    $sermon->title = $title;
    $sermon->sermon_date = $date;
    $sermon->speaker = $_POST['speaker'];
    $sermon->type = "Audio";

    if(!file_exists('../' . $downloadUrl) && !isset($die)):
      if(move_uploaded_file($_FILES['file']['tmp_name'][0], '../' . $downloadUrl)):
        $sermon->downloadUrl = $downloadUrl;
      endif;
    endif;

    $sermon->addSermon();

    $result = $sermon->result;
    echo isset($result) . ' ' . $result;
    if (isset($result) && $result === 'Success' && !isset($die)):
      header("HTTP/1.1 200");
      $response['status'] = 200;
      $response['status_message'] = 'ok';
      $response['data'] = $sermon->result;
      echo json_encode($response);
    else:
      header("HTTP/1.1 500");

      $response['status'] = 500;
      $response['status_message'] = 'There was an error';
      $response['data'] = $sermon->result;

      echo json_encode($response);
      exit();
    endif;
  endif;
}
