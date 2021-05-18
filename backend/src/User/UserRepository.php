<?php

class UserRepository extends Authentication
{

    private PDO $dbConnection;

    public function __construct()
    {
        try {
            $db = new PDOConnection();
            $this->dbConnection = $db->connection();
            parent::__construct();
        } catch (PDOException $e) {
            HTTP_Response::SendWithBody(HTTP_Response::MSG_INTERNAL_SERVER_ERROR, $e, HTTP_Response::INTERNAL_SERVER_ERROR);
            die();
        }
    }

    public function login($params)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT id, email, password, is_admin from user WHERE email = :email AND password = :password;');
            $query->execute([
                'email' => $params[1],
                'password' => Authentication::encrypt($params[2])
            ]);

            $x = $query->fetchAll();
            $is_admin = (bool)$x[0]['is_admin'];

            if ($query->rowCount()) {
                HTTP_Response::SendWithBody(
                    HTTP_Response::MSG_OK,
                    array(
                        "jwt_token" => Authentication::generateJWT($x[0]),
                        "message" => $is_admin ? "Login is successful" : "You don't have admin permission!",
                        "is_admin" => $is_admin
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
        if (!strcmp($data->password, $data->re_password) && filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            try {
                $query = $this->dbConnection->prepare('INSERT INTO user (name, surname, email, password, is_admin) VALUES (:name, :surname, :email, :password, :is_admin);');
                $query->execute([
                    'name' => $data->name,
                    'surname' => $data->surname,
                    'email' => $data->email,
                    'password' => Authentication::encrypt($data->password),
                    'is_admin' => $data->is_admin ?? b'0'
                ]);

                $id = $this->dbConnection->lastInsertId();

                if ($query->rowCount()) {
                    HTTP_Response::SendWithBody(
                        HTTP_Response::MSG_CREATED,
                        array(
                            "jwt_token" => Authentication::generateJWT([
                                'id' => $id,
                                'email' => $data->email,
                                'password' => Authentication::encrypt($data->password)
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
