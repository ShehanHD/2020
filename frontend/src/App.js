import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import NavBar from './Components/Shared/NavBar';
import Admin from './Components/TodoApp/Admin';
import NewTodos from './Components/TodoApp/NewTodos';
import Todos from './Components/TodoApp/Todos';

function App() {
  return (
    <BrowserRouter>

      <NavBar />

      <Switch>
        {/* TODO APP */}
        <Route exact path={'/todo'}>
          <Todos />
        </Route>
        <Route exact path={'/todo/newTodo'}>
          <NewTodos />
        </Route>
        <Route exact path={'/todo/admin'}>
          <Admin />
        </Route>
        {/* END TODO APP */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
