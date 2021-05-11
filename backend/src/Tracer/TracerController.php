<?php


class TracerController
{
    private string $remoteAddress;
    private TracerRepository $tracer;

    public function __construct($params, $method, $data, $ip)
    {
        $this->tracer = new TracerRepository();
        $params = $params ?? NULL;
        $this->remoteAddress = $ip;


        switch ($method) {
            case 'GET':
                $this->get($params);
                break;
            case 'POST':
                $this->post($params, $data);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function get($params)
    {
        try {
            switch ($params[0]) {
                case 'get_by':
                    isset($params[1]) ? $this->tracer->getTrace($params[1]) : http_response_code(404);
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

            switch ($params[0]) {
                case 'new_trace':
                    $this->tracer->addTrace($data, $this->remoteAddress);
                    break;
                default:
                    HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::NOT_FOUND);
                    break;
            }
        } catch (Exception $e) {
            echo json_encode($e);
            die();
        }
    }
}
