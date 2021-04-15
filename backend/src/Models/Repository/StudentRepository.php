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

    public function deleteDataStudentAudit()
    {
        try {
            $query = $this->dbConnection->prepare('DELETE FROM Studenti_Audit;');
            $query->execute();

            http_response_code(200);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function newStudent($data)
    {
        try {
            $bool = $data->Ripetente == "1" ? "b'1'" : "b'0'";
            $query = $this->dbConnection->prepare('INSERT INTO Studenti (Nominativo, NatoIl, Ripetente, Sesso, Eta, MediaVoti, Classe) VALUES (:Nominativo, :NatoIl, ' . $bool . ', :Sesso, :Eta, :MediaVoti, :Classe);');
            $query->execute(['Nominativo' => $data->Nominativo, 'NatoIl' => $data->NatoIl, 'Sesso' => $data->Sesso, 'Eta' => $data->Eta, 'MediaVoti' => $data->MediaVoti, 'Classe' => $data->Classe]);
            $x = $this->dbConnection->lastInsertId();

            http_response_code(201);
            echo json_encode(array("IdStudente" => $x));
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

            if ($query->rowCount() == "1") {
                http_response_code(201);
            } else {
                http_response_code(203);
            }
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
