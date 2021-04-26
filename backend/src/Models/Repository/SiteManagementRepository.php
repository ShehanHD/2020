<?php
require('./src/Models/dbConfiguration.php');

class SiteManagementRepository
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

    public function getPageData($params)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT page_data from pages WHERE site_id = :site_id AND page_name = :page_name;');
            $query->execute([
                'site_id' => $params[1],
                'page_name' => $params[2]
            ]);
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function addPageData($data, $remoteAddress)
    {
    }
}
