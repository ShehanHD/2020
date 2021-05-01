<?php

class Verifica1Repository
{
    private $dbConnection;

    public function __construct()
    {
        try {
            $db = new PDOConnection();
            $this->dbConnection = $db->connection();
        } catch (PDOException $e) {
            echo json_encode($e);
            die();
        }
    }

    public function GetEmployees()
    {
        try {
            $query = $this->dbConnection->prepare('SELECT IMPIEGATO.*, TURNO.Data, TURNO.OraI, TURNO.OraF  from IMPIEGATO INNER JOIN TURNO ON TURNO.CodImp = IMPIEGATO.CodImp');
            $query->execute();
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetEmployee($id)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT IMPIEGATO.*, TURNO.Data, TURNO.OraI, TURNO.OraF  from IMPIEGATO INNER JOIN TURNO ON TURNO.CodImp = IMPIEGATO.CodImp AND IMPIEGATO.CodImp = :id;');
            $query->execute(['id' => $id]);
            $x = $query->fetch();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetEmployeeBySearch($str)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT IMPIEGATO.*, TURNO.Data, TURNO.OraI, TURNO.OraF  from IMPIEGATO INNER JOIN TURNO ON TURNO.CodImp = IMPIEGATO.CodImp AND IMPIEGATO.Cognome LIKE :str;');
            $query->execute(['str' => "%$str%"]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetEmployeeByDepartment($str)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * From IMPIEGATO WHERE CodDip IN (SELECT CodDip FROM DIPARTIMENTO WHERE Città = :citta) ORDER BY Cognome ASC;');
            $query->execute(['citta' => $str]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetEmployeeBySalary($str)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT MAX(Stipendio) as stipendioMassimo From IMPIEGATO WHERE CodDip = (SELECT CodDip FROM DIPARTIMENTO WHERE Città = :citta);');
            $query->execute(['citta' => $str]);
            $x = $query->fetch();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetMaxSalary($str)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * FROM TURNO INNER JOIN IMPIEGATO ON IMPIEGATO.CodImp = TURNO.CodImp AND Stipendio >= :salary;');
            $query->execute(['salary' => $str]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetDepartments()
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from DIPARTIMENTO WHERE 1;');
            $query->execute();
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetDepartment($id)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from DIPARTIMENTO WHERE  CodDip = :id');
            $query->execute(['id' => $id]);
            $x = $query->fetch();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetDepartmentByExpense($str)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * FROM DIPARTIMENTO WHERE :expense <= (SELECT SUM(Stipendio) FROM IMPIEGATO, DIPARTIMENTO WHERE DIPARTIMENTO.CodDip = IMPIEGATO.CodDip);');
            $query->execute(['expense' => $str]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetDepartmentBySalaryAVG($str)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT CodDip, AVG(Stipendio) AS StipendioMedia From IMPIEGATO WHERE CodDip = (SELECT CodDip FROM DIPARTIMENTO WHERE Città = :city );');
            $query->execute(['city' => $str]);
            $x = $query->fetch();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    //! DA FARE
    public function GetDepartmentBySalaryAndCity($city, $salary)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT DIPARTIMENTO.Denominazione, MAX(IMPIEGATO.Stipendio) stipendioMAX From DIPARTIMENTO INNER JOIN IMPIEGATO ON DIPARTIMENTO.CodDip = IMPIEGATO.CodDip AND DIPARTIMENTO.Città = :city GROUP BY DIPARTIMENTO.CodDip ORDER BY DIPARTIMENTO.CodDip;');
            $query->execute(['city' => $city]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }
}
