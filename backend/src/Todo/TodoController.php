<?php


class TodoController
{
    private TodoRepository $Todo;
    private mixed $firstParams;
    private mixed $secParams;

    public function __construct($params, $method, $data)
    {
        $this->Todo = new TodoRepository();
        $this->firstParams = isset($params[0]) ? $params[0] : NULL;
        $this->secParams = $params[1] ?? NULL;


        switch ($method) {
            case 'GET':
                $this->Get($this->firstParams, $this->secParams);
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
            case 'DELETE':
                $this->Delete($this->firstParams, $this->secParams);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    private function Get($firstParams, $id)
    {
        try {
            switch ($firstParams) {
                case '':
                    $this->Todo->GetTodos();
                    break;
                case 'category':
                    $this->Todo->GetCategory();
                    break;
                case 'subcategory':
                    $this->Todo->GetSubCategory($id);
                    break;
                default:
                    $this->Todo->GetTodo($firstParams);
                    break;
            }
        } catch (Exception $e) {
            print_r($e);
        }
    }

    private function Post($firstParams, $data)
    {
        try {
            $data = json_decode($data);

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

    private function Put($id, $data)
    {
        try {
            $this->Todo->EditTodo($id, $data);
        } catch (Exception $e) {
            print_r($e);
        }
    }

    private function Patch($id)
    {
        try {
            $this->Todo->CloseTodo($id);
        } catch (Exception $e) {
            print_r($e);
        }
    }

    public function Delete($firstParams, $id)
    {
        try {
            switch ($firstParams) {
                case 'category':
                    $this->Todo->DeleteCategory($id);
                    break;
                default:
                    echo http_response_code(404);
                    break;
            }
        } catch (Exception $e) {
            print_r($e);
        }
    }
}
