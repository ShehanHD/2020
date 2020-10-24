import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import NavBar from './Components/Shared/NavBar';
import Todos from './Components/Exercises/TodoApp/Todos';
import { createMuiTheme, MuiThemeProvider, useTheme } from '@material-ui/core';
import useStyles from './Hooks/useStyles';
import Dashboard from './Components/Dashboard/Dashboard';
import Exercises from './Components/Exercises/Exercises';

function App() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [darkMode, setDarkMode] = useState(true);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: { main: '#00e7ff' },
      secondary: { main: '#eee' },
    },
  });

  const lightTheme = createMuiTheme({
    palette: {
      primary: { main: '#1c1f4c' },
      secondary: { main: '#00848c' },
      background: {
        default: "#ebebd9",
        paper: "#d6d8ce",
      },
    },
  });

  const toggleDarkTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <NavBar toggleDarkTheme={toggleDarkTheme} />

        <div className={classes.content}>
          <Switch>
            <Route exact path={'/'}>
              <Dashboard />
            </Route>

            <Route exact path={'/exercises'}>
              <Exercises />
            </Route>

            <Route exact path={'/:path/todo'}>
              <Todos />
            </Route>

          </Switch>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
