<?php

class User {
  // user attributes
  public $username;
  public $password;
  public $id;
  public $guid;

  // sets up the database connection
  private function setupDb(){
    include('../db/config.php');
  }

  public function login() {
    $this->setupDb();
    if (isset($this->username) && isset($this->password)):
      try {
        $sql = $this->db->prepare(" SELECT username, kp_user, guid
                                    FROM users
                                    WHERE username = ? AND password = ?");
        $sql->bindParam(1, $this->username);
        $sql->bindParam(2, md5($this->password));
        $sql->execute();
        $results = $sql->fetchAll(PDO::FETCH_ASSOC);
        $this->result = $sql->rowCount() === 1 ? $results : 'Failed';
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
    if (isset($this->guid)):
      try {
        $sql = $this->db->prepare(" SELECT Count(*)
                                    FROM users
                                    WHERE guid = ?");
        $sql->bindParam(1, $this->guid);
        $sql->execute();
        $this->result = $sql->fetchColumn() === 1 ? true : false;
      } catch (Exception $e) {
        $this->result = $e;
      }
    endif;
  }

  public function getUsers() {
    $this->setupDb();
    try {
      $sql = $this->db->prepare(" SELECT username, kp_user
                                  FROM users");
      $sql->execute();
      $results = $sql->fetchAll(PDO::FETCH_ASSOC);
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
        $sql = $this->db->prepare(" INSERT INTO users (username, password)
                                    VALUES (?, ?)");
        $sql->bindParam(1, $this->username);
        $sql->bindParam(2, md5($this->password));
        $sql->execute();
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
                                    WHERE id = ?");
        $sql->bindParam(1, $this->id);
        $sql->execute();
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
}
