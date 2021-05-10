<?php

interface HttpMapping
{
    function getMapping($params, $body);
    function postMapping($params, $body);
    function deleteMapping($params, $body);
    function patchMapping($params, $body);
}
