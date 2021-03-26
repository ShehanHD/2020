<?php
require('./src/Models/dbConfiguration.php');

class StudentRepository
{
    private $dbConnection;

    public function __construct()
    {
        try {
            $db = new PDOConnection("DBProva");
            $this->dbConnection = $db->connection();
        } catch (PDOException $e) {
            echo json_encode($e);
            die();
        }
    }

    public function GetStudents()
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from Studenti');
            $query->execute();
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetStudentsAudit()
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from Studenti_Audit');
            $query->execute();
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function SetName($data)
    {
        try {
            $query = $this->dbConnection->prepare('UPDATE Studenti SET Nominativo = :name WHERE IdStudente = :id;');
            $query->execute(['name' => $data->Nominativo, 'id' => $data->IdStudente]);

            http_response_code(201);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function DeleteStudent($id)
    {
        try {
            $query = $this->dbConnection->prepare('DELETE FROM Studenti WHERE IdStudente = :id;');
            $query->execute(['id' => $id]);

            http_response_code(200);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }
}
