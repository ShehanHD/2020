<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$URL = preg_split('@/@', $_SERVER['REQUEST_URI'], NULL, PREG_SPLIT_NO_EMPTY);
$REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];

$controller = isset($URL[3]) ? $URL[3] : "";

if ($URL[0] === "2020" && $URL[1] === "backend" && $URL[2] === "api") {
    switch ($controller) {
        case 'todo':
            include('./src/Controller/TodoController.php');
            new TodoController(array_slice($URL, 4), $REQUEST_METHOD);
            break;

        default:
            echo http_response_code(404);
            break;
    }
} else {
    echo http_response_code(404);
}
