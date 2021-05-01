<?php

class SiteManagementController
{
    private $siteManagement;
    private $tracer;

    public function __construct($params, $method, $body)
    {
        $this->siteManagement = new SiteManagementRepository();
        $params = isset($params) ? $params : NULL;


        switch ($method) {
            case 'GET':
                $this->get($params);
                break;
            case 'POST':
                $this->post($params, $body);
                break;
            default:
                echo http_response_code(404);
                break;
        }
    }

    public function get($params)
    {
        try {
            switch ($params[0]) {
                case 'all_pages':
                    $this->siteManagement->getAllPageData($params);
                    break;
                case 'details':
                    $this->siteManagement->getPageData($params);
                    break;
                default:
                    echo http_response_code(404);
                    break;
            }
        } catch (Exception $e) {
            echo json_encode($e);
            die();
        }
    }

    public function post($params, $body)
    {
        try {
            $data = json_decode($body);

            switch ($params[0]) {
                case '':
                    //$this->siteManagement->addPageData($data);
                    break;
                default:
                    echo http_response_code(404);
                    break;
            }
        } catch (Exception $e) {
            echo json_encode($e);
            die();
        }
    }
}
