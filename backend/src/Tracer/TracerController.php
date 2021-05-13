<?php


class TracerController extends Rest implements HttpMapping
{
    private string $remoteAddress;
    private TracerRepository $tracer;

    public function __construct($params, $method, $body, $ip)
    {
        $this->tracer = new TracerRepository();
        $this->remoteAddress = $ip;

        parent::__construct($params, $method, $body);
    }

    /**
     * @param $params
     * @param $body
     */
    function getMapping($params, $body)
    {
        switch ($params[0]) {
            case 'get_by':
                isset($params[1]) ? $this->tracer->getTrace($params[1]) : HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::NOT_FOUND);
                break;
            default:
                HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::NOT_FOUND);
                 break;
        }
    }

    /**
     * @param $params
     * @param $body
     */
    function postMapping($params, $body)
    {
        $body = json_decode($body);

        switch ($params[0]) {
            case 'new_trace':
                $this->tracer->addTrace($body, $this->remoteAddress);
                break;
            default:
                HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::NOT_FOUND);
                break;
        }
    }

}
