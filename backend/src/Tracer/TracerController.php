<?php


class TracerController
{
    private $remoteAddress;
    private $tracer;
    private $params;

    public function __construct($params, $method, $data, $ip)
    {
        $this->tracer = new TracerRepository();
        $this->params = isset($params[0]) ? $params[0] : NULL;
        $this->remoteAddress = $ip;


        switch ($method) {
            case 'GET':
                $this->get($this->params);
                break;
            case 'POST':
                $this->post($this->params, $data);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function get($params)
    {
        try {
            switch ($params) {
                case '':
                    $this->tracer->getTrace();
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

    public function post($params, $data)
    {
        try {
            $data = json_decode($data);

            switch ($params) {
                case '':
                    $this->tracer->addTrace($data, $this->remoteAddress);
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
