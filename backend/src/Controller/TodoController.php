<?php
require "src/Models/Repository/TodoRepository.php";

class TodoController
{
    public function __construct($params, $method)
    {
        if ($method === "GET") {
            try {
                $id = isset($params[0]) ? $params[0] : NULL;

                $TODO = new TodoRepository();

                if ($id) {
                    $TODO->GetTodo($id);
                } else {
                    $TODO->GetTodos();
                }
            } catch (Exception $e) {
                print_r($e);
            }
        } elseif ($method === "POST") {
            echo $method;
        } elseif ($method === "PATCH") {
            echo $method;
        } else {
            echo http_response_code(404);
        }
    }
}
