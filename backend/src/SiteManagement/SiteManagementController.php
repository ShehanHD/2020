<?php

class SiteManagementController extends Rest implements HttpMapping
{
    private SiteManagementRepository $siteManagement;

    public function __construct($params, $method, $body)
    {
        $this->siteManagement = new SiteManagementRepository();
        parent::__construct($params, $method, $body);
    }

    /**
     * @param $params
     * @param $body
     * @return mixed
     */
    function getMapping($params, $body): mixed
    {
        switch ($params[0]) {
            case 'all_pages':
                $this->siteManagement->getAllPageData($params);
                break;
            case 'details':
                $this->siteManagement->getPageData($params);
                break;
            default:
                HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::NOT_FOUND);
                break;
        }
    }

    /**
     * @param $params
     * @param $body
     * @return mixed
     */
    function postMapping($params, $body): mixed
    {
        $data = json_decode($body);

        switch ($params[0]) {
            case '':
                //$this->siteManagement->addPageData($data);
                break;
            default:
                HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::NOT_FOUND);
                break;
        }
    }

    /**
     * @param $params
     * @param $body
     * @return mixed
     */
    function deleteMapping($params, $body): mixed
    {
        // TODO: Implement deleteMapping() method.
    }

    /**
     * @param $params
     * @param $body
     * @return mixed
     */
    function patchMapping($params, $body): mixed
    {
        // TODO: Implement patchMapping() method.
    }
}
