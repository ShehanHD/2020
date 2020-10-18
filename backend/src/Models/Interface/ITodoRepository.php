<?php

namespace TD {
    interface ITodoRepository
    {
        function GetTodos();

        function GetTodo($id);

        function CloseTodo($id);
    }
}
