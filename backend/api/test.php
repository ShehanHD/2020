<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

class TEST
{
    public function read()
    {
        return json_encode(array('msg' => 'test'));
    }
}

$x = new TEST();

echo $x->read();
