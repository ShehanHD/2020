<?php

class UserRepository
{

    private $dbConnection;
    private $auth;

    public function __construct()
    {
        $this->auth = new Authentication();
        try {
            $db = new PDOConnection();
            $this->dbConnection = $db->connection();
        } catch (PDOException $e) {
            echo json_encode($e);
            die();
        }
    }

    public function login($data)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT email, password from user WHERE email = :email AND password = :password;');
            $query->execute([
                'email' => $data->email,
                'password' => $this->auth->crypt($data->password)
            ]);
            $x = $query->fetchAll();

            if ($query->rowCount()) {
                http_response_code(202);
                echo json_encode(array(
                    "jwt_token" => $this->auth->generateJWT($x),
                    "message" => "Login is successful"
                ));
            } else {
                http_response_code(401);
                echo json_encode(array(
                    "message" => "Authentication failed"
                ));
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array(
                "message" => $e->errorInfo[2]
            ));
        }
    }

    public function adminLogin($data)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT email, password from user WHERE email = :email AND password = :password AND is_admin = ' . b'1' . ';');
            $query->execute([
                'email' => $data->email,
                'password' => $this->auth->crypt($data->password)
            ]);
            $x = $query->fetchAll();

            if ($query->rowCount()) {
                http_response_code(202);
                echo json_encode(array(
                    "jwt_token" => $this->auth->generateJWT($x),
                    "message" => "Login is successful"
                ));
            } else {
                http_response_code(401);
                echo json_encode(array(
                    "message" => "Authentication failed",
                    "dati" => $x
                ));
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array(
                "message" => $e->errorInfo[2]
            ));
        }
    }

    public function registration($data)
    {
        if ($data->password === $data->re_password) {
            try {
                $is_admin = $data->is_admin == 1 ? "b'1'" : "b'0'";
                $query = $this->dbConnection->prepare('INSERT INTO user (name, surname, email, password, is_admin) VALUES (:name, :surname, :email, :password, ' . $is_admin . ');');
                $query->execute([
                    'name' => $data->name,
                    'surname' => $data->surname,
                    'email' => $data->email,
                    'password' => $this->auth->crypt($data->password)
                ]);

                if ($query->rowCount()) {
                    http_response_code(201);
                    echo json_encode(array(
                        "jwt_token" => $this->auth->generateJWT([
                            'email' => $data->email,
                            'password' => $data->password
                        ]),
                        "message" => "new user successfully created"
                    ));
                } else {
                    http_response_code(401);
                    echo json_encode(array(
                        "message" => "Authentication failed"
                    ));
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(array(
                    "message" => $e->errorInfo[2]
                ));
            }
        } else {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Passwords are not matching!"
            ));
        }
    }
}
