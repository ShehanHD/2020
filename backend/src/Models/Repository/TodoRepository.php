<?php
require './src/Models/dbConfiguration.php';
require './src/Models/interface/ITodoRepository.php';

use TD\ITodoRepository;

class TodoRepository implements ITodoRepository
{
    private $dbConnection;

    public function __construct()
    {
        try {
            $db = new PDOConnection();
            $this->dbConnection = $db->connection();
        } catch (PDOException $e) {
            print_r($e->getMessage());
            die();
        }
    }

    public function GetTodos()
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from todos WHERE 1');
            $query->execute();
            $x = $query->fetchAll();
            print_r($x);
        } catch (Exception $e) {
            print_r($e->getMessage());
            http_response_code(500);
        }
    }

    public function GetTodo($id)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from todos WHERE todo_id = :id');
            $query->execute([':id' => $id]);
            $x = $query->fetch();
            print_r($x);
        } catch (Exception $e) {
            print_r($e->getMessage());
            http_response_code(500);
        }
    }

    public function CloseTodo($id)
    {
        try {
            $query = $this->dbConnection->prepare('UPDATE todos SET isComplete = True WHERE todo_id = :id');
            $query->execute([':id' => $id]);
            $x = $query->fetch();
            print_r($x);
        } catch (Exception $e) {
            print_r($e->getMessage());
            http_response_code(500);
        }
    }

    public function AddTodo($data)
    {
        $this->dbConnection->beginTransaction();

        $query = $this->dbConnection->prepare('INSERT INTO todos () VALUES ();');
        $query->execute([]);

        $this->dbConnection->commit();
    }

    public function EditTodo($id, $data)
    {
        $this->dbConnection->rollBack();
        return 0;
    }
}
