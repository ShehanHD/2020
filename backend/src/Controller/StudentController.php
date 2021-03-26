<?php
require("src/Models/Repository/StudentRepository.php");

class StudentController
{
    private $Student;

    public function __construct($params, $method, $data)
    {
        $this->Student = new StudentRepository();

        switch ($method) {
            case 'GET':
                $this->Get($params, $data);
                break;
            case 'POST':
                $this->post($params, $data);
                break;
            case 'PUT':
                $this->put($params, $data);
                break;
            case 'DELETE':
                $this->delete($params, $data);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function Get($params, $data)
    {
        switch ($params[0]) {
            case 'students':
                $this->Student->GetStudents();
                break;
            case 'students_audit':
                $this->Student->GetStudentsAudit();
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function delete($params, $data)
    {
        $data = json_decode($data);

        switch ($params[0]) {
            case 'delete':
                $this->Student->DeleteStudent($params[1]);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function put($params, $data)
    {
        $data = json_decode($data);

        switch ($params[0]) {
            case 'setName':
                $this->Student->SetName($data);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function Post($params, $data)
    {
    }
}
