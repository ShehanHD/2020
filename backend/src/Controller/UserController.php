<?php
require("src/Models/Repository/UserRepository.php");

class UserController
{
    public function __construct($params, $method, $body)
    {
        $this->siteManagement = new UserRepository();
        $params = isset($params) ? $params : NULL;


        switch ($method) {
            case 'GET':
                //$this->get($params);
                break;
            case 'POST':
                $this->post($params, $body);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function post($params, $body)
    {
        try {
            $data = json_decode($body);

            switch ($params[0]) {
                case '':
                    $this->siteManagement->login($data);
                    break;
                default:
                    echo http_response_code(404);
                    break;
            }
        } catch (Exception $e) {
            echo json_encode($e);
            die();
        }
    }
}
