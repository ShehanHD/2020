<?php


class Api
{
    public function __construct($controller, $params, $request_method, $body)
    {
        switch ($controller) {
            case 'site_management':
                new SiteManagementController($params, $request_method, $body);
                break;
            case 'todo':
                new TodoController($params, $request_method, $body);
                break;
            case 'verifica1':
                new Verifica1Controller($params, $request_method, $body);
                break;
            case 'esercizio1':
                new Esercizio1Controller($params, $request_method, $body);
                break;
            case 'student':
                new StudentController($params, $request_method, $body);
                break;
            case 'trace':
                new TracerController($params, $request_method, $body, $_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['HTTP_ORIGIN']); //$_SERVER['HTTP_X_REAL_IP']
                break;
            case 'auth':
                new UserController($params, $request_method, $body);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }
}