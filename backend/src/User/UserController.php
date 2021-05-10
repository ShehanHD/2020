<?php

class UserController extends Rest implements HttpMapping
{
    private UserRepository $siteManagement;

    public function __construct($params, $method, $body)
    {
        $this->siteManagement = new UserRepository();
        parent::__construct($params, $method, $body);
    }

    function getMapping($params, $body)
    {
        switch ($params[0] ?? "") {
            case '':
                //$this->siteManagement->get();
                break;
            default:
                HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::MSG_NOT_FOUND);
                break;
        }
    }

    function postMapping($params, $body)
    {
        $data = json_decode($body);

        switch ($params[0] ?? "") {
            case 'login':
                $this->siteManagement->login($data);
                break;
            case 'registration':
                $this->siteManagement->registration($data);
                break;
            default:
                HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::MSG_NOT_FOUND);
                break;
        }
    }

    function deleteMapping($params, $body)
    {
        // TODO: Implement deleteMapping() method.
    }

    function patchMapping($params, $body)
    {
        // TODO: Implement patchMapping() method.
    }
}
