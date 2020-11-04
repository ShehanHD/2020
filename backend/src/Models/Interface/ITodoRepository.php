<?php

namespace TD {
    interface ITodoRepository
    {
        function AddTodo($data);

        function AddCategory($data);

        function DeleteCategory($id);

        function AddSubCategory($data);

        function GetTodos();

        function GetTodo($id);

        function GetCategory();

        function GetSubCategory($id);

        function CloseTodo($id);

        function EditTodo($id, $data);
    }
}
