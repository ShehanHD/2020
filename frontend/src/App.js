import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import { ConfirmProvider } from "material-ui-confirm";
import Info from './Components/Info/Info';
import { Login } from './Components/Authentication/Login';
import { Register } from './Components/Authentication/Register';
import BP from './Components/Exercises/BussinesPlan/BP';
import Student from './Components/Exercises/Student/Student';
import { SITE_ID, URL } from './Components/Shared/api_url';
import Admin from './Components/Admin/Admin';

function App() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [darkMode, setDarkMode] = useState(true);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: { main: '#d6d6d6' },
      secondary: { main: '#ff2200' },
      background: {
        default: "#282C2F",
        paper: "#1e1e1e",
      },
    },
  });

  const lightTheme = createMuiTheme({
    palette: {
      primary: { main: '#282C2F' },
      secondary: { main: '#ff2200' },
      background: {
        default: "#ffffff",
        paper: "#a0a0a0",
      },
    },
  });

  const traceUser = (app) => {
    let pageName = app.split("/").slice(-1).toString();

    fetch(`${URL}/trace`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        siteId: SITE_ID,
        pageName
      }),
    })
      .then(response => {
        //console.log(response);
      })
      .then(data => {
        //console.log(data)
      })
  }

  const toggleDarkTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <ConfirmProvider>
            <NavBar toggleDarkTheme={toggleDarkTheme} />

            <div className={classes.content}>
              <Switch>
                <Route exact path={'/'}> <Dashboard traceUser={traceUser} /> </Route>
                <Route exact path={'/covid'}> <Covid traceUser={traceUser} /> </Route>

                <Route exact path={'/exercises'}> <Exercises /> </Route>
                <Route exact path={'/exercises/todo'}> <Todos traceUser={traceUser} /> </Route>
                <Route exact path={'/exercises/business-plan'}> <BP traceUser={traceUser} /> </Route>
                <Route exact path={'/exercises/student'}> <Student traceUser={traceUser} /> </Route>

                <Route exact path={'/info'}> <Info traceUser={traceUser} /> </Route>
                <Route exact path={'/admin'}> <Admin traceUser={traceUser} /> </Route>

                <Route exact path={'/login'}> <Login traceUser={traceUser} /> </Route>
                <Route exact path={'/register'}> <Register traceUser={traceUser} /> </Route>
              </Switch>
            </div>
            <Notification />
          </ConfirmProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}

export default App;
