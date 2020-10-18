<?php
require "src/Models/Repository/TodoRepository.php";

class TodoController
{
    private $Todo;
    private $id;

    public function __construct($params, $method, $data)
    {
        $this->Todo = new TodoRepository();
        $this->id = isset($params[0]) ? $params[0] : NULL;

        if ($method === "GET") {
            $this->Get($this->id);
        } elseif ($method === "POST") {
            $this->post($data);
        } elseif ($method === "PATCH") {
            $this->Patch($this->id);
        } elseif ($method === "PUT") {
            $this->Put($this->id, $data);
        } else {
            echo http_response_code(404);
        }
    }

    public function Get($id)
    {
        try {
            if ($id) {
                $this->Todo->GetTodo($id);
            } else {
                $this->Todo->GetTodos();
            }
        } catch (Exception $e) {
            print_r($e);
        }
    }

    public function Post($data)
    {
        try {
            $this->Todo->AddTodo($data);
        } catch (Exception $e) {
            print_r($e);
        }
    }

    public function Put($id, $data)
    {
        try {
            $this->Todo->EditTodo($id, $data);
        } catch (Exception $e) {
            print_r($e);
        }
    }

    public function Patch($id)
    {
        try {
            $this->Todo->CloseTodo($id);
        } catch (Exception $e) {
            print_r($e);
        }
    }
}
