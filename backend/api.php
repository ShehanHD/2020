<?php
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Authorization, Content-Type,Accept, Origin");
    exit(0);
}

$URL = preg_split('@/@', $_SERVER['REQUEST_URI'], NULL, PREG_SPLIT_NO_EMPTY);
$REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];

// var_dump($_SERVER['REQUEST_URI']);

$controller = isset($URL[3]) ? $URL[3] : "";

if ($URL[0] === "2020" && $URL[1] === "backend" && $URL[2] === "api") {
    switch ($controller) {
        case 'todo':
            include('./src/Controller/TodoController.php');
            new TodoController(array_slice($URL, 4), $REQUEST_METHOD, file_get_contents('php://input'));
            break;

        default:
            echo http_response_code(404);
            break;
    }
} else {
    echo http_response_code(404);
}