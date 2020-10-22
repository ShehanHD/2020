<?php

namespace TD {
    interface ITodoRepository
    {
        function AddTodo($data);

        function AddCategory($data);

        function AddSubCategory($data);

        function GetTodos();

        function GetTodo($id);

        function CloseTodo($id);

        function EditTodo($id, $data);
    }
}
