<?php

class PDOConnection
{
    private $user;
    private $password;
    private $dsn;

    public function __construct($dbname = "wecode2020")
    {
        $host = getenv('DB_HOST'); //mariadb
        $port = getenv('DB_PORT');
        $this->user = getenv('DB_USER');
        $this->password = getenv('DB_PASSWORD');
        $this->dsn = getenv('DB_HOST');

        $this->dsn = 'mysql:host=' . $host . ';dbname=' . $dbname . ';port=' . $port;
    }

    public function connection()
    {
        try {
            $pdo = new PDO($this->dsn, $this->user, $this->password);
            //* set attribute
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $pdo;
        } catch (PDOException $e) {
            throw $e;
        }
    }
}
