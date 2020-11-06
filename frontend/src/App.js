import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Notification from './Components/Shared/Notification'
import NavBar from './Components/Shared/NavBar';
import Todos from './Components/Exercises/TodoApp/Todos';
import { createMuiTheme, MuiThemeProvider, useTheme } from '@material-ui/core';
import useStyles from './Hooks/useStyles';
import Dashboard from './Components/Dashboard/Dashboard';
import Exercises from './Components/Exercises/Exercises';
import Covid from './Components/Covid/Covid';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [darkMode, setDarkMode] = useState(true);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: { main: '#00e7ff' },
      secondary: { main: '#ff2200' },
    },
  });

  const lightTheme = createMuiTheme({
    palette: {
      primary: { main: '#1c1f4c' },
      secondary: { main: '#00848c' },
      // background: {
      //   default: "#e6e6e6",
      //   paper: "#4dc5d8",
      // },
    },
  });

  const toggleDarkTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <NavBar toggleDarkTheme={toggleDarkTheme} />

          <div className={classes.content}>
            <Switch>
              <Route exact path={'/'}> <Dashboard /> </Route>
              <Route exact path={'/covid'}> <Covid /> </Route>

              <Route exact path={'/exercises'}> <Exercises /> </Route>
              <Route exact path={'/exercises/todo'}> <Todos /> </Route>
            </Switch>
          </div>
          <Notification />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}

export default App;
