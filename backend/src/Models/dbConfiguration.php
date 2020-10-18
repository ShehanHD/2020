<?php

class PDOConnection
{
    private $host = 'localhost';
    private $user = "root";
    private $password = "";
    private $dbname = "test";
    private $dsn;

    public function __construct()
    {
        $this->dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
    }

    public function connection()
    {
        try {
            $pdo = new PDO($this->dsn, $this->user, $this->password);
            //! set attribute
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $pdo;
        } catch (PDOException $e) {
            throw $e;
        }
    }
}
