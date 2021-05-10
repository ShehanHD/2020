<?php


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

    public function getTrace($id)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from trace WHERE visited_site = :visited_site;');
            $query->execute(['visited_site' => $id]);
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

        $response = file_get_contents("http://api.ipstack.com/$remoteAddress?access_key=$api_key");
        $response = json_decode($response);

        if (!property_exists($response, 'success')) {
            try {
                $verify = $this->dbConnection->prepare(
                    'SELECT * FROM pages 
                    WHERE
                    site_id = :site_id AND page_name = :page_name'
                );

                $verify->execute([
                    'site_id' => $data->siteId,
                    'page_name' => $data->pageName
                ]);

                $isVerified = $verify->rowCount();

                if ($isVerified) {
                    $insert = $this->dbConnection->prepare(
                        'INSERT INTO trace 
                (ip, visited_at, country_name, city, zip, country_flag, latitude, longitude, visited_site, visited_page) 
                VALUES 
                (:ip, CURRENT_TIMESTAMP, :country_name, :city, :zip, :country_flag, :latitude, :longitude, :visited_site, :visited_page);'
                    );

                    $insert->execute([
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
                } else {
                    http_response_code(401);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode($e);
            }
        } else {
            http_response_code(500);
            echo json_encode($response->error);
        }
    }
}
