<?php

class PDOConnection
{
    private $host = 'mariadb'; //mariadb
    private $user = "wecode";
    private $password = "wecode2020";
    private $port = 3307;
    private $dsn;

    public function __construct($dbname = "wecode2020")
    {
        $this->dsn = 'mysql:host=' . $this->host . ';dbname=' . $dbname . ';port=' . $this->port;
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
