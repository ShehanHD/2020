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
     * @return void
     */
    function getMapping($params, $body)
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
     * @return void
     */
    function postMapping($params, $body)
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
