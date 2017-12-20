<?php

class Sermon {
  // sermon attributes
  public $title;
  public $speaker;
  public $sermon_date;
  public $type;
  public $downloadUrl;
  public $db;

  // sets up the database connection
  private function setupDb(){
    include('../db/config.php');
  }

  public function getSermons(){
    $this->setupDb();

    try{
      $results = $this->db->prepare(" SELECT title, sermon_date, download_link, speaker, kp_sermon
                                      FROM sermons
                                      WHERE type = ?
                                      ORDER BY sermon_date DESC ");
      $results->bindParam(1, $this->type);
      $results->execute();
      $this->result = $results->fetchAll(PDO::FETCH_ASSOC);
      $results = null;
      $this->db = null;
    } catch(Exception $e) {
      $this->result = $e;
      exit;
    }
  }

  public function addSermon() {
    $this->setupDb();

    if (isset($this->downloadUrl)):

      try {
        $sql = $this->db->prepare(" INSERT INTO sermons (title, type, download_link, speaker, sermon_date)
                                    VALUES (?, ?, ?, ?, ?)");
        $sql->bindParam(1, $this->title);
        $sql->bindParam(2, $this->type);
        $sql->bindParam(3, $this->downloadUrl);
        $sql->bindParam(4, $this->speaker);
        $sql->bindParam(5, $this->sermon_date);
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

  public function deleteSermon() {
    $this->setupDb();
    if (isset($this->sermonId)):
      try {
        $sql = $this->db->prepare(" DELETE FROM sermons
                                    WHERE id = ?");
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
}
