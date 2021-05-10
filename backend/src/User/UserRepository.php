<?php

class UserRepository
{

    private PDO $dbConnection;
    private Authentication $auth;

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
            $query = $this->dbConnection->prepare('SELECT email, password, is_admin from user WHERE email = :email AND password = :password;');
            $query->execute([
                'email' => $data->email,
                'password' => $this->auth->encrypt($data->password)
            ]);
            $x = $query->fetchAll();

            if ($query->rowCount()) {
                HTTP_Response::SendWithBody(
                    HTTP_Response::MSG_OK,
                    array(
                        "jwt_token" => $this->auth->generateJWT($x[0]),
                        "message" => "Login is successful"
                    ),
                    HTTP_Response::OK
                );
            } else {
                HTTP_Response::Send(HTTP_Response::MSG_UNAUTHORIZED, HTTP_Response::UNAUTHORIZED);
            }
        } catch (Exception $e) {
            HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
        }
    }

    public function adminLogin($data)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT email, password from user WHERE email = :email AND password = :password AND is_admin = ' . b'1' . ';');
            $query->execute([
                'email' => $data->email,
                'password' => $this->auth->encrypt($data->password)
            ]);
            $x = $query->fetchAll();

            if ($query->rowCount()) {
                HTTP_Response::SendWithBody(
                    HTTP_Response::MSG_OK,
                    array(
                        "jwt_token" => $this->auth->generateJWT($x[0]),
                        "message" => "Login is successful"
                    ),
                    HTTP_Response::OK
                );
            } else {
                HTTP_Response::Send(HTTP_Response::MSG_UNAUTHORIZED, HTTP_Response::UNAUTHORIZED);
            }
        } catch (Exception $e) {
            HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
        }
    }

    public function registration($data)
    {
        if (strcmp($data->password, $data->re_password)) {
            try {
                $is_admin = $data->is_admin == 1 ? "b'1'" : "b'0'";
                $query = $this->dbConnection->prepare('INSERT INTO user (name, surname, email, password, is_admin) VALUES (:name, :surname, :email, :password, ' . $is_admin . ');');
                $query->execute([
                    'name' => $data->name,
                    'surname' => $data->surname,
                    'email' => $data->email,
                    'password' => $this->auth->encrypt($data->password)
                ]);

                if ($query->rowCount()) {
                    HTTP_Response::SendWithBody(
                        HTTP_Response::MSG_CREATED,
                        array(
                            "jwt_token" => $this->auth->generateJWT([
                                'email' => $data->email,
                                'password' => $this->auth->encrypt($data->password)
                            ]),
                            "message" => "new user successfully created"
                        ),
                        HTTP_Response::CREATED
                    );
                } else {
                    HTTP_Response::Send(HTTP_Response::MSG_UNAUTHORIZED, HTTP_Response::UNAUTHORIZED);
                }
            } catch (Exception $e) {
                HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
            }
        } else {
            HTTP_Response::SendWithBody(
                HTTP_Response::MSG_BAD_REQUEST,
                array( "message" => "Passwords are not matching!" ),
                HTTP_Response::BAD_REQUEST
            );
        }
    }
}
