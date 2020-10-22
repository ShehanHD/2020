<?php
require "src/Models/Repository/TodoRepository.php";

class TodoController
{
    private $Todo;
    private $firstParams;

    public function __construct($params, $method, $data)
    {
        $this->Todo = new TodoRepository();
        $this->firstParams = isset($params[0]) ? $params[0] : NULL;


        switch ($method) {
            case 'GET':
                $this->Get($this->firstParams);
                break;
            case 'POST':
                $this->post($this->firstParams, $data);
                break;
            case 'PATCH':
                $this->Patch($this->firstParams);
                break;
            case 'PUT':
                $this->Put($this->firstParams, $data);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function Get($firstParams)
    {
        try {
            if ($firstParams) {
                $this->Todo->GetTodo($firstParams);
            } else {
                $this->Todo->GetTodos();
            }
        } catch (Exception $e) {
            print_r($e);
        }
    }

    public function Post($firstParams, $data)
    {
        try {
            switch ($firstParams) {
                case '':
                    $this->Todo->AddTodo($data);
                    break;
                case 'category':
                    $this->Todo->AddCategory($data);
                    break;
                case 'subcategory':
                    $this->Todo->AddSubCategory($data);
                    break;
                default:
                    echo http_response_code(404);
                    break;
            }
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
