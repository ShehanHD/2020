<?php
require('./src/Models/dbConfiguration.php');
require('./src/Models/Interface/ITodoRepository.php');

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
            echo json_encode($e);
            die();
        }
    }

    public function GetTodos()
    {
        try {
            $query = $this->dbConnection->prepare('SELECT todos.todos_id, todos.name, todos.sub_name, todos.is_done, todos.created_on, todos.finished_on, categories.name as category_name from todos INNER JOIN categories ON todos.category_id = categories.category_id ORDER BY todos.created_on DESC;');
            $query->execute();
            $x = $query->fetchAll();
            echo json_encode($x);
        } catch (Exception $e) {
            echo json_encode($e);
            http_response_code(500);
        }
    }

    public function GetTodo($id)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from todos WHERE todo_id = :id');
            $query->execute(['id' => $id]);
            $x = $query->fetch();
            print_r($x);
        } catch (Exception $e) {
            echo json_encode($e);
            http_response_code(500);
        }
    }

    public function CloseTodo($id)
    {
        try {
            $query = $this->dbConnection->prepare('UPDATE todos SET is_done = 1, finished_on = CURRENT_TIMESTAMP WHERE todos_id = :id');
            $query->execute(['id' => $id]);
            $x = $query->fetch();
            echo json_encode($x);
        } catch (Exception $e) {
            echo json_encode($e);
            http_response_code(500);
        }
    }

    public function AddTodo($data)
    {
        try {
            // $this->dbConnection->beginTransaction();
            $query = $this->dbConnection->prepare('INSERT INTO todos (name, category_id, sub_name, created_on) VALUES (:name, :category_id, :sub_name, CURRENT_TIMESTAMP);');
            $query->execute(['name' => $data->name, 'category_id' => $data->category_id, 'sub_name' => $data->sub_name]);
            echo json_encode($data);
            http_response_code(201);
            // $this->dbConnection->commit();
        } catch (Exception $e) {
            // $this->dbConnection->rollBack();
            // print_r($e->getMessage());
            echo json_encode($e);
            http_response_code(500);
        }
    }

    public function AddCategory($data)
    {
        try {
            $query = $this->dbConnection->prepare("INSERT INTO categories (name, user_id) VALUES (:name, :user_id);");
            $query->execute(['name' => $data->name, 'user_id' => $data->user_id]);

            echo json_encode($data);
            http_response_code(201);
        } catch (Exception $e) {
            echo json_encode($e);
            http_response_code(500);
        }
    }

    public function AddSubCategory($data)
    {
        try {
            $query = $this->dbConnection->prepare("INSERT INTO sub_categories (name, category_id) VALUES (:name, :category_id);");
            $query->execute(['name' => $data->name, 'category_id' => $data->category_id]);

            echo json_encode($data);
            http_response_code(201);
        } catch (Exception $e) {
            echo json_encode($e);
            http_response_code(500);
        }
    }

    public function GetCategory()
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * FROM categories WHERE 1');
            $query->execute();
            $x = $query->fetchAll();
            echo json_encode($x);
        } catch (Exception $e) {
            echo json_encode($e);
            http_response_code(500);
        }
    }

    public function DeleteCategory($id){
        try {
            $query = $this->dbConnection->prepare('DELETE FROM  categories WHERE category_id=:id');
            $query->execute(['id' => $id]);
            
            echo json_encode($x);
        } catch (Exception $e) {
            echo json_encode($e);
            http_response_code(500);
        }
    }

    public function GetSubCategory($id)
    {
        try {
            $query = $this->dbConnection->prepare("SELECT * FROM sub_categories WHERE category_id = :id");
            $query->execute(['id' => $id]);
            
            $x = $query->fetchAll();
            echo json_encode($x);
        } catch (Exception $e) {
            echo json_encode($e);
            http_response_code(500);
        }
    }

    public function EditTodo($id, $data)
    {
        return 0;
    }
}
