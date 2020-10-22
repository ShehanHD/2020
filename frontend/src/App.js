import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import NavBar from './Components/Shared/NavBar';
import Todos from './Components/TodoApp/Todos';
import Home from './Components/Home';
import { createMuiTheme, MuiThemeProvider, useTheme } from '@material-ui/core';
import useStyles from './Hooks/useStyles';
import { blue, grey } from '@material-ui/core/colors';

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
      primary: blue,
      secondary: grey,
      background: {
        default: "#cacaca",
        paper: "#e4e4e4d9",
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
              <Home />
            </Route>
            {/* TODO APP */}
            <Route exact path={'/todo'}>
              <Todos />
            </Route>
            {/* END TODO APP */}
          </Switch>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
