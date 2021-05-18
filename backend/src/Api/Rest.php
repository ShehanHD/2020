<?php


class Rest implements HttpMapping
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

    /**
     * @param $params
     * @param $body
     * @return void
     */
    function getMapping($params, $body)
    {
        // TODO: Implement getMapping() method.
    }

    /**
     * @param $params
     * @param $body
     * @return void
     */
    function postMapping($params, $body)
    {
        // TODO: Implement postMapping() method.
    }

    /**
     * @param $params
     * @param $body
     * @return void
     */
    function deleteMapping($params, $body)
    {
        // TODO: Implement deleteMapping() method.
    }

    /**
     * @param $params
     * @param $body
     * @return void
     */
    function patchMapping($params, $body)
    {
        // TODO: Implement patchMapping() method.
    }
}