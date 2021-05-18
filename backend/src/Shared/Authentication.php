<?php
require_once("./vendor/firebase/php-jwt/src/JWT.php");

use Firebase\JWT\ExpiredException;
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
        $expire     = $issuedAt->modify('+60 minutes')->getTimestamp();      // Add 60 seconds
        $serverName = "https://wecode.best";


        $payload = array(
            "iss" => $serverName,
            "iat" => $issuedAt->getTimestamp(),
            "nbf" => $issuedAt->getTimestamp(),
            "exp" => $expire,
            "data" => array(
                'email' => $this->encrypt($data['email']),
                'password' => $this->decrypt($data['password'])
            )
        );

        return JWT::encode($payload, $key, 'HS512');
    }

    public static function verifyJWT() : bool{
        try {
            $a = new Authentication;
            $token = $a->getToken();
            $now = new DateTimeImmutable();
            $serverName = "https://wecode.best";

            return !(
                $token->iss !== $serverName ||
                $token->nfb > $now->getTimestamp() ||
                $token->exp < $now->getTimestamp()
            );
        }
        catch (ExpiredException|Exception $e){
            HTTP_Response::Send(HTTP_Response::MSG_BAD_REQUEST,  HTTP_Response::BAD_REQUEST);
            return false;
        }
    }

    public function encrypt($payload): string
    {
        return openssl_encrypt($payload, "aes256", getenv("ENCRYPT_KEY"), 0, getenv("IV"));
    }

    public function decrypt($payload): string
    {
        return openssl_decrypt($payload, "aes256", getenv("ENCRYPT_KEY"), 0, getenv("IV"));
    }

    /**
     * @throws Exception
     */
    private function getToken() : object{
        if (!preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
            throw new Exception("Invalid Token");
        }

        return JWT::decode($matches[1], $this->jwt_key, ['HS512']);
    }

}
