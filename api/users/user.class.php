<?php

class User {
  // user attributes
  public $username;
  public $password;
  public $id;
  public $guid;
  public $fullName;
  public $position;

  // sets up the database connection
  private function setupDb(){
    include('../db/config.php');
  }

  public function login() {
    $this->setupDb();
    if (isset($this->username) && isset($this->password)):
      try {
        $sql = $this->db->prepare(" SELECT username, kp_user, guid, full_name, position
                                    FROM users
                                    WHERE username = ? AND password = ?");
        $hashPass = md5($this->password);
        $sql->bindParam(1, $this->username);
        $sql->bindParam(2, $hashPass);
        $sql->execute();
        $results = $sql->fetch(PDO::FETCH_ASSOC);
        $this->result = $sql->rowCount() === 1 ? $results : 'Failed';
        $sql = null;
        $this->db = null;
      } catch(Exception $e) {
        $this->result = $e;
        exit;
      }
    else:
      $this->result = 'Failed';
    endif;
  }

  public function isCookieValid() {
    $this->setupDb();
    $result = false;
    if (isset($this->guid) && isset($this->username)):
      try {
        $sql = $this->db->prepare(" SELECT Count(*)
                                    FROM users
                                    WHERE guid = ? AND username = ?");
        $sql->bindParam(1, $this->guid);
        $sql->bindParam(2, $this->username);
        $sql->execute();
        $result = $sql->fetchColumn() === 1 ? true : false;
        $sql = null;
        $this->db = null;
      } catch (Exception $e) {
        $result = false;
      }
    endif;
    return $result;
  }

  public function getUsers() {
    $this->setupDb();
    try {
      $sql = $this->db->prepare(" SELECT username, kp_user, full_name, position
                                  FROM users");
      $sql->execute();
      $results = $sql->fetchAll(PDO::FETCH_ASSOC);
      $sql = null;
      $this->db = null;
    } catch(Exception $e) {
      $this->result = $e;
      exit;
    }
    $this->result = $results;
  }

  public function addUser() {
    $this->setupDb();
    if (isset($this->username) && isset($this->password)):
      try {
        $guid = $this->getGUID();
        $sql = $this->db->prepare(" INSERT INTO users (username, password, guid, full_name, position)
                                    VALUES (?, ?, ?, ?, ?)");
        $hashPass = md5($this->password);
        $sql->bindParam(1, $this->username);
        $sql->bindParam(2, $hashPass);
        $sql->bindparam(3, $guid);
        $sql->bindparam(4, $this->fullName);
        $sql->bindparam(5, $this->position);
        $sql->execute();
        $sql = null;
        $this->db = null;
      } catch(Exception $e) {
        $this->result = $e;
        exit;
      }
      $this->result = 'Success';
    else:
      $this->result = 'Failed';
    endif;
  }

  public function deleteUser() {
    $this->setupDb();
    if (isset($this->id)):
      try {
        $sql = $this->db->prepare(" DELETE FROM users
                                    WHERE kp_user = ?");
        $sql->bindParam(1, $this->id);
        $sql->execute();
        $sql = null;
        $this->db = null;
      } catch(Exception $e) {
        $this->result = $e;
        exit;
      }
      $this->result = 'Success';
    else:
      $this->result = 'Failed';
    endif;
  }

  public function __toString(){
    return $this->result;
  }

  private function getGUID(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    } else {
        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = chr(123)// "{"
            .substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12)
            .chr(125);// "}"
        return $uuid;
    }
}
}
