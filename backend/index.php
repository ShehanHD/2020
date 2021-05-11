<?php
require_once("./src/Shared/common.php");
require_once("./src/Api/HttpMapping.php");

$HTTP_ORIGIN = $_SERVER['HTTP_ORIGIN'];

if (controlOrigin($HTTP_ORIGIN)) {
    header("Access-Control-Allow-Origin: *");
    new Env;
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Authorization, Content-Type,Accept, Origin");
        exit(0);
    }
    $URL = preg_split('@/@', $_SERVER['REQUEST_URI'], -1, PREG_SPLIT_NO_EMPTY);
    $request_method = $_SERVER['REQUEST_METHOD'];
    $controller = $URL[2] ?? "";
    $params = array_slice($URL, 3) ?? "";
    $body = file_get_contents('php://input');

    if ($URL[0] === "api" && $URL[1] === "v1") {
        new Api($controller, $params, $request_method, $body);
    } else {
        HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::NOT_FOUND);
    }
} else {
    HTTP_Response::Send(HTTP_Response::MSG_UNAUTHORIZED, HTTP_Response::UNAUTHORIZED);
}
