<?php

require('./src/Models/dbConfiguration.php');

class Esercizio1Repository
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

    public function GetCyclistByAge($age)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT Nome, Nazione FROM ciclista WHERE `Età` > :age;');
            $query->execute(['age' => $age]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetRacesByRange($start, $end)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT COUNT(IdGara) NumeroDiGare FROM gara WHERE Lunghezza > :start AND Lunghezza < :end;');
            $query->execute(['start' => $start, 'end' => $end]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetCyclistByRaceCountry($country)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT ciclista.* FROM gara INNER JOIN gareggia ON gara.IdGara = gareggia.IdGara AND gara.Nazione = :country INNER JOIN ciclista ON gareggia.IdCiclista = ciclista.IdCiclista;');
            $query->execute(['country' => $country]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetCyclistByRaceCountryOrderByAge($country)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT ciclista.* FROM gara INNER JOIN gareggia ON gara.IdGara = gareggia.IdGara AND gara.Nazione = :country INNER JOIN ciclista ON gareggia.IdCiclista = ciclista.IdCiclista ORDER BY ciclista.Età;');
            $query->execute(['country' => $country]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetWinningCyclistByCountry($country)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT ciclista.* FROM gara INNER JOIN gareggia ON gara.IdGara = gareggia.IdGara AND gareggia.Piazzamento = 1 INNER JOIN ciclista ON gareggia.IdCiclista = ciclista.IdCiclista AND ciclista.Nazione = :country');
            $query->execute(['country' => $country]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetRaceByWinnersCountry($country)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT gara.* FROM gara INNER JOIN gareggia ON gara.IdGara = gareggia.IdGara AND gareggia.Piazzamento = 1 INNER JOIN ciclista ON gareggia.IdCiclista = ciclista.IdCiclista AND ciclista.Nazione = :country');
            $query->execute(['country' => $country]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }
}
