<?php


class UserController
{
    private $siteManagement;

    public function __construct($params, $method, $body)
    {
        $this->siteManagement = new UserRepository();
        $params = (isset($params) ? $params : NULL);

        switch ($method) {
            case 'GET':
                $this->get($params);
                break;
            case 'POST':
                $this->post($params, $body);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function get($params)
    {
        switch (isset($params[0]) ? $params[0] : "") {
            case '':
                //$this->siteManagement->get();
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

            switch (isset($params[0]) ? $params[0] : "") {
                case 'login':
                    $this->siteManagement->login($data);
                    break;
                case 'admin_login':
                    $this->siteManagement->adminLogin($data);
                    break;
                case 'registration':
                    $this->siteManagement->registration($data);
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
