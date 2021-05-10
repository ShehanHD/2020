<?php


class Rest
{
    public function __construct($params, $method, $body)
    {
        switch ($method){
            case "GET":
                $this->getMapping($params, $body);
                break;
            case "POST":
                $this->postMapping($params, $body);
                break;
            case "PUT":
                $this->putMapping($params, $body);
                break;
            case "PATCH":
                $this->patchMapping($params, $body);
                break;
            case "DELETE":
                $this->deleteMapping($params, $body);
                break;
        }
    }
}