<?php
require_once("./vendor/firebase/php-jwt/src/JWT.php");

use \Firebase\JWT\JWT;

class Authentication
{
    private string $jwt_key;

    public function __construct()
    {
        $this->jwt_key = getenv("JWT_KEY");
    }

    public function generateJWT($data): string
    {
        $key = $this->jwt_key;
        $issuedAt   = new DateTimeImmutable();
        $expire     = $issuedAt->modify('+6 minutes')->getTimestamp();      // Add 60 seconds
        $serverName = "https://wecode.best";


        $payload = array(
            "iss" => $serverName,
            "iat" => $issuedAt->getTimestamp(),
            "nbf" => $issuedAt->getTimestamp(),
            "exp" => $expire,
            "data" => array(
                'email' => $data['email'],
                'password' => $this->decrypt($data['password'])
            )
        );

        return JWT::encode($payload, $key, 'HS512');
    }

    public function verifyJWT($data){

    }

    public function encrypt($payload): string
    {
        return openssl_encrypt($payload, "aes256", getenv("ENCRYPT_KEY"), 0, getenv("IV"));
    }

    public function decrypt($payload): string
    {
        return openssl_decrypt($payload, "aes256", getenv("ENCRYPT_KEY"), 0, getenv("IV"));
    }
}
