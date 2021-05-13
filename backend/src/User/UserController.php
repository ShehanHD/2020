<?php

class UserController extends Rest
{
    private UserRepository $siteManagement;

    public function __construct($params, $method, $body)
    {
        $this->siteManagement = new UserRepository();
        parent::__construct($params, $method, $body);
    }

    /**
     * @param $params
     * @param $body
     */
    function getMapping($params, $body)
    {
        switch ($params[0] ?? "") {
            case 'login':
                $this->siteManagement->login(json_decode($body));
                break;
            default:
                HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::MSG_NOT_FOUND);
                break;
        }
    }

    /**
     * @param $params
     * @param $body
     */
    function postMapping($params, $body)
    {
        $data = json_decode($body);

        switch ($params[0] ?? "") {
            case 'registration':
                $this->siteManagement->registration($data);
                break;
            default:
                HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::MSG_NOT_FOUND);
                break;
        }
    }

}
