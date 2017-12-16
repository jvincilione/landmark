<?php

class Sermon {
  // sermon attributes
  public $title;
  public $speaker;
  public $sermon_date;
  public $type;
  public $downloadUrl;

  // sets up the database connection
  private function setupDb(){
    include('../db/config.inc');
  }

  public function getSermons(){
    $this->setupDb();

    try{
      $results = $this->db->prepare(" SELECT title, sermon_date, download_link, speaker, type
                                      FROM sermons
                                      WHERE type = ?
                                      ORDER BY sermon_date DESC ");
      $results->bindParam(1, $this->type);
      $results->execute();
      $result = $results->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      $this->result = '<h1>Oops, something went wrong!</h1><p>Please contact an administrator: ERROR CODE: 2100.</p>';
      exit;
    }

    //result
    $this->result = $result;
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