<?php
require_once("./vendor/firebase/php-jwt/src/JWT.php");

use \Firebase\JWT\JWT;

class Authentication
{
    private $jwt_key;

    public function __construct()
    {
        $this->jwt_key = getenv("JWT_KEY");
    }

    public function generateJWT($data)
    {
        $key = $this->jwt_key;
        $payload = array(
            "iss" => "https://wecode.best",
            "aud" => "https://www.wecode.best",
            "iat" => time(),
            "nbf" => time() + 10,
            "exp" => time() + 3600,
            "data" => array(
                'email' => $data['email'],
                'password' => $this->decrypt($data['password'])
            )
        );

        return JWT::encode($payload, $key);
    }

    public function encrypt($payload)
    {
        return openssl_encrypt($payload, "aes256", getenv("ENCRYPT_KEY"), 0, getenv("IV"));
    }

    public function decrypt($payload)
    {
        return openssl_decrypt($payload, "aes256", getenv("ENCRYPT_KEY"), 0, getenv("IV"));
    }
}
