<?php
require('./src/Models/dbConfiguration.php');

class TracerRepository
{
    private $dbConnection;

    public function __construct()
    {
        try {
            $db = new PDOConnection();
            $this->dbConnection = $db->connection();
        } catch (PDOException $e) {
            throw $e;
        }
    }

    public function getTrace()
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from pages;');
            $query->execute();
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function addTrace($data, $remoteAddress)
    {
        $api_key = "7c99ceecda2271d22003b1905e233fb1&format=1";

        $response = file_get_contents("http://api.ipstack.com/151.64.207.164?access_key=$api_key");
        $response = json_decode($response);

        try {
            $query = $this->dbConnection->prepare(
                'INSERT INTO trace 
                (ip, visited_at, country_name, city, zip, country_flag, latitude, longitude, visited_site, visited_page) 
                VALUES 
                (:ip, CURRENT_TIMESTAMP, :country_name, :city, :zip, :country_flag, :latitude, :longitude, :visited_site, :visited_page);'
            );

            $query->execute([
                'ip' => $response->ip,
                'country_name' => $response->country_name,
                'city' => $response->city,
                'zip' => $response->zip,
                'country_flag' => $response->location->country_flag,
                'latitude' => $response->latitude,
                'longitude' => $response->longitude,
                'visited_site' => $data->siteId,
                'visited_page' => $data->pageName
            ]);


            http_response_code(201);
            echo json_encode($data);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }
}
