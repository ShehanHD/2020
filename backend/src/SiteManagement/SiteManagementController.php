<?php

class SiteManagementController extends Rest
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
     */
    function postMapping($params, $body)
    {
        $data = json_decode($body);

        if(Authentication::verifyJWT()){
            switch ($params[0]) {
                case 'new_site':
                    $this->siteManagement->addNewSite($data);
                    break;
                default:
                    HTTP_Response::Send(HTTP_Response::MSG_NOT_FOUND, HTTP_Response::NOT_FOUND);
                    break;
            }
        }
        else HTTP_Response::Send(HTTP_Response::MSG_UNAUTHORIZED,  HTTP_Response::UNAUTHORIZED);
    }

}
