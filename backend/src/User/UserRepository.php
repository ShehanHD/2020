<?php
require "vendor/autoload.php";

use \Firebase\JWT\JWT;

class UserRepository
{
    public function __construct()
    {
    }

    public function login($data)
    {
        echo json_encode($this->generateJWT($data));
    }

    private function generateJWT($data)
    {
        $key = "example_key";
        $payload = array(
            "iss" => "https://wecode.best",
            "aud" => "https://www.wecode.best",
            "iat" => time(),
            "nbf" => time() + 10,
            "exp" => time() + 60,
            "data" => $data
        );

        $jwt = JWT::encode($payload, $key);
        return $jwt;
    }
}
