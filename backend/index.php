<?php
require_once("./src/Shared/autoLoader.php");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Authorization, Content-Type,Accept, Origin");
    exit(0);
}

new Env;

$HTTP_ORIGIN = $_SERVER['HTTP_ORIGIN'];

if (
    $HTTP_ORIGIN == "https://www.wecode.best" ||
    $HTTP_ORIGIN == "https://wecode.best" ||
    $HTTP_ORIGIN == "http://localhost:3000" ||
    $HTTP_ORIGIN == null
) {

    header("Access-Control-Allow-Origin: $HTTP_ORIGIN");

    $URL = preg_split('@/@', $_SERVER['REQUEST_URI'], -1, PREG_SPLIT_NO_EMPTY);
    $request_method = $_SERVER['REQUEST_METHOD'];

    $controller = $URL[2] ?? "";
    $params = array_slice($URL, 3) ?? "";
    $body = file_get_contents('php://input');

    if ($URL[0] === "api" && $URL[1] === "v1") {
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
                new TracerController($params, $request_method, $body, $HTTP_ORIGIN); //$_SERVER['HTTP_X_REAL_IP']
                break;
            case 'auth':
                new UserController($params, $request_method, $body); //$_SERVER['HTTP_X_REAL_IP']
                break;
            default:
                echo http_response_code(404);
                break;
        }
    } else {
        HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::NOT_FOUND);
    }
} else {
    HTTP_Response::Send(HTTP_Response::MSG_UNAUTHORIZED, HTTP_Response::UNAUTHORIZED);
}
