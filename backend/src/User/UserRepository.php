<?php
require 'vendor/autoload.php';

use \Firebase\JWT\JWT;

class UserRepository
{

    private $jwt_key;

    public function __construct()
    {
        $jwt_key = getenv("JWT_KEY");
    }

    public function get()
    {
        echo  openssl_encrypt("aaaaaa", "aes256", getenv("ENCRYPT_KEY"), 0, getenv("IV"));

        //openssl_decrypt($x, "aes256", getenv("ENCRYPT_KEY"), 0, getenv("IV"));
    }

    public function login($data)
    {
        echo json_encode($this->generateJWT($data));
        // $decoded = JWT::decode($jwt, $key, array('HS256'));
    }

    public function registration($data)
    {
    }

    private function generateJWT($data)
    {
        $key = $this->jwt_key;
        $payload = array(
            "iss" => "https://wecode.best",
            "aud" => "https://www.wecode.best",
            "iat" => time(),
            "nbf" => time() + 10,
            "exp" => time() + 60,
            "data" => $data
        );

        return JWT::encode($payload, $key);
    }
}
