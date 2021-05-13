<?php

class SiteManagementRepository extends Authentication
{
    private PDO $dbConnection;

    public function __construct()
    {
        try {
            $db = new PDOConnection();
            $this->dbConnection = $db->connection();
            parent::__construct();
        } catch (PDOException $e) {
            HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
        }
    }

    public function getAllPageData($params)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from page WHERE site_id = :site_id');
            $query->execute([
                'site_id' => $params[1]
            ]);
            $x = $query->fetchAll();

            HTTP_Response::SendWithBody(HTTP_Response::MSG_OK, $x, HTTP_Response::OK);
        } catch (PDOException $e) {
            HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
        }
    }

    public function getPageData($params)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT page_data from page WHERE site_id = :site_id AND page_name = :page_name;');
            $query->execute([
                'site_id' => $params[1],
                'page_name' => $params[2]
            ]);

            $x = $query->fetchAll();

            if (sizeof($x) !== 0) {
                HTTP_Response::SendWithBody(HTTP_Response::MSG_OK, $x, HTTP_Response::OK);
            } else {
                HTTP_Response::Send(HTTP_Response::MSG_BAD_REQUEST, HTTP_Response::BAD_REQUEST);
            }
        } catch (PDOException $e) {
            HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
        }
    }

    public function addNewSite($data)
    {
        try {
            $this->dbConnection->beginTransaction();

            $query = $this->dbConnection->prepare("SELECT site_id FROM site WHERE site_id = :controlId;");
            $query->execute([
                'controlId' => '586c7a18-d050-4cc8-8ba5-373accc6bcd8'
            ]);

            $idSito = $query->fetch()['site_id'];

            $query = $this->dbConnection->prepare("INSERT INTO () VALUES ();");

            $this->dbConnection->commit();
        }
        catch (PDOException $e){
            $this->dbConnection->rollBack();
            HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
        }
    }

}
