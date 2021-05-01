<?php

class Verifica1Controller
{
    private $Verifica;

    public function __construct($params, $method, $data)
    {
        $this->Verifica = new Verifica1Repository();

        switch ($method) {
            case 'GET':
                $this->Get($params, $data);
                break;
            case 'POST':
                $this->post($params, $data);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function Get($params, $data)
    {
        switch ($params[0]) {
            case 'dipendenti':
                $this->Verifica->GetEmployees();
                break;
            case 'dipendente':
                $this->Verifica->GetEmployee($params[1]);
                break;
            case 'search-query':
                $this->Verifica->GetEmployeeBySearch($params[1]);
                break;
            case 'dipendentiSuDipartimento':
                $this->Verifica->GetEmployeeByDepartment($params[1]);
                break;
            case 'stipendioPiuDi':
                $this->Verifica->GetEmployeeBySalary($params[1]);
                break;
            case 'maxStipendioSuDipartimento':
                $this->Verifica->GetMaxSalary($params[1]);
                break;
            case 'dipartimenti':
                $this->Verifica->GetDepartments();
                break;
            case 'dipartimentiSuSpesePiuDi':
                $this->Verifica->GetDepartmentByExpense($params[1]);
                break;
            case 'dipartimentoSuStipendioMedia':
                $this->Verifica->GetDepartmentBySalaryAVG($params[1]);
                break;
            case 'dipartimentoSuCittaEStipendioPiuDi':
                $this->Verifica->GetDepartmentBySalaryAndCity($params[1], $params[2]);
                break;
            case 'dipartimento':
                $this->Verifica->GetDepartment($params[1]);
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
