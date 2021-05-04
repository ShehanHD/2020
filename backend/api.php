<?php
require_once("./src/Shared/autoLoader.php");

new Env;

$HTTP_ORIGIN = $_SERVER['HTTP_ORIGIN'];

if (
    $HTTP_ORIGIN == "https://www.wecode.best" ||
    $HTTP_ORIGIN == "https://wecode.best" ||
    $HTTP_ORIGIN == "http://localhost:3000"
) {

    header("Access-Control-Allow-Origin: $HTTP_ORIGIN");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Authorization, Content-Type,Accept, Origin");
        exit(0);
    }

    $URL = preg_split('@/@', $_SERVER['REQUEST_URI'], -1, PREG_SPLIT_NO_EMPTY);
    $REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];
    // var_dump($_SERVER['REQUEST_URI']);

    $controller = isset($URL[3]) ? $URL[3] : "";

    if ($URL[0] === "2020" && $URL[1] === "backend" && $URL[2] === "api") {
        switch ($controller) {
            case 'site_management':
                new SiteManagementController(array_slice($URL, 4), $REQUEST_METHOD, file_get_contents('php://input'));
                break;
            case 'todo':
                new TodoController(array_slice($URL, 4), $REQUEST_METHOD, file_get_contents('php://input'));
                break;
            case 'verifica1':
                new Verifica1Controller(array_slice($URL, 4), $REQUEST_METHOD, file_get_contents('php://input'));
                break;
            case 'esercizio1':
                new Esercizio1Controller(array_slice($URL, 4), $REQUEST_METHOD, file_get_contents('php://input'));
                break;
            case 'student':
                new StudentController(array_slice($URL, 4), $REQUEST_METHOD, file_get_contents('php://input'));
                break;
            case 'trace':
                new TracerController(array_slice($URL, 4), $REQUEST_METHOD, file_get_contents('php://input'), $HTTP_ORIGIN); //$_SERVER['HTTP_X_REAL_IP']
                break;
            case 'auth':
                new UserController(array_slice($URL, 4), $REQUEST_METHOD, file_get_contents('php://input'), $HTTP_ORIGIN); //$_SERVER['HTTP_X_REAL_IP']
                break;
            default:
                echo http_response_code(404);
                break;
        }
    } else {
        echo http_response_code(404);
    }
} else {
    echo "Access Denied";
    http_response_code(401);
}
