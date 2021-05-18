<?php


class TracerRepository
{
    private PDO $dbConnection;

    public function __construct()
    {
        try {
            $db = new PDOConnection();
            $this->dbConnection = $db->connection();
        } catch (PDOException $e) {
            HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
            die();
        }
    }

    public function getTrace($id)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from trace WHERE visited_site = :visited_site;');
            $query->execute(['visited_site' => $id]);
            $x = $query->fetchAll();

            HTTP_Response::SendWithBody(HTTP_Response::MSG_OK, $x, HTTP_Response::OK);

        } catch (PDOException $e) {
            HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
        }
    }

    public function addTrace($data, $remoteAddress)
    {
        $api_key = "7c99ceecda2271d22003b1905e233fb1&format=1";

        $response = file_get_contents("http://api.ipstack.com/$remoteAddress?access_key=$api_key");
        $response = json_decode($response);

        if (!property_exists($response, 'success')) {
            try {
                $this->dbConnection->beginTransaction();

                $verify = $this->dbConnection->prepare('SELECT id FROM page WHERE site_id = :site_id AND page_name = :page_name');

                $verify->execute([
                    'site_id' => $data->siteId,
                    'page_name' => $data->pageName
                ]);

                $isVerified = $verify->rowCount();
                $page = $verify->fetchAll();

                if ($isVerified) {
                    $insert = $this->dbConnection->prepare(
                        'INSERT INTO trace  (ip, visited_at, country_name, city, zip, country_flag, latitude, longitude, visited_site, visited_page) 
                                VALUES (:ip, CURRENT_TIMESTAMP, :country_name, :city, :zip, :country_flag, :latitude, :longitude, :visited_site, :visited_page);');

                    $insert->execute([
                        'ip' => $response->ip,
                        'country_name' => $response->country_name,
                        'city' => $response->city,
                        'zip' => $response->zip,
                        'country_flag' => $response->location->country_flag,
                        'latitude' => $response->latitude,
                        'longitude' => $response->longitude,
                        'visited_site' => $data->siteId,
                        'visited_page' => $page[0]['id']
                    ]);

                    $this->dbConnection->commit();

                    HTTP_Response::Send(HTTP_Response::MSG_CREATED, HTTP_Response::CREATED);
                } else {
                    HTTP_Response::Send(HTTP_Response::UNAUTHORIZED, HTTP_Response::UNAUTHORIZED);
                }
            } catch (Exception $e) {
                $this->dbConnection->rollBack();
                HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
            }
        } else {
            HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $response->error, HTTP_Response::INTERNAL_SERVER_ERROR);
        }
    }
}
