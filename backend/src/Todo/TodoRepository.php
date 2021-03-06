<?php


class TodoRepository
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
            $query = $this->dbConnection->prepare('SELECT todos.todos_id, todos.name, todos.sub_name, todos.is_done, todos.created_on, todos.finished_on, categories.name as category_name, todos.expire_on from todos INNER JOIN categories ON todos.category_id = categories.category_id ORDER BY todos.created_on DESC;');
            $query->execute();
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetTodo($id)
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * from todos WHERE todo_id = :id');
            $query->execute(['id' => $id]);
            $x = $query->fetch();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function CloseTodo($id)
    {
        try {
            $query = $this->dbConnection->prepare('UPDATE todos SET is_done = 1, finished_on = CURRENT_TIMESTAMP WHERE todos_id = :id');
            $query->execute(['id' => $id]);
            $x = $query->fetch();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function AddTodo($data)
    {
        try {
            // $this->dbConnection->beginTransaction();
            $query = $this->dbConnection->prepare('INSERT INTO todos (name, category_id, sub_name, created_on, expire_on) VALUES (:name, :category_id, :sub_name, CURRENT_TIMESTAMP, :expire_on);');
            $query->execute(['name' => $data->name, 'category_id' => $data->category_id, 'sub_name' => $data->sub_name, 'expire_on' => $data->expire_on]);
            http_response_code(201);
            echo json_encode($data);
            // $this->dbConnection->commit();
        } catch (Exception $e) {
            // $this->dbConnection->rollBack();
            // print_r($e->getMessage());
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function AddCategory($data)
    {
        try {
            if ($data->name) {
                $query = $this->dbConnection->prepare("INSERT INTO categories (name, user_id) VALUES (:name, :user_id);");
                $query->execute(['name' => $data->name, 'user_id' => $data->user_id]);

                http_response_code(201);
                echo json_encode($data);
            } else {
                throw new Exception("Empty Field");
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function AddSubCategory($data)
    {
        try {
            if ($data->name) {
                $query = $this->dbConnection->prepare("INSERT INTO sub_categories (name, category_id) VALUES (:name, :category_id);");
                $query->execute(['name' => $data->name, 'category_id' => $data->category_id]);

                http_response_code(201);
                echo json_encode($data);
            } else {
                throw new Exception("Empty Field");
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetCategory()
    {
        try {
            $query = $this->dbConnection->prepare('SELECT * FROM categories WHERE 1');
            $query->execute();
            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function DeleteCategory($id)
    {
        try {
            $query = $this->dbConnection->prepare('DELETE FROM  categories WHERE category_id=:id');
            $query->execute(['id' => $id]);

            http_response_code(200);
            echo json_encode($id);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function GetSubCategory($id)
    {
        try {
            $query = $this->dbConnection->prepare("SELECT * FROM sub_categories WHERE category_id = :id");
            $query->execute(['id' => $id]);

            $x = $query->fetchAll();

            http_response_code(200);
            echo json_encode($x);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode($e);
        }
    }

    public function EditTodo($id, $data)
    {
        return 0;
    }
}
