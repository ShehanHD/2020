import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { URL } from '../Shared/api_url';
import sha256 from 'sha256'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect, useDispatch, useSelector } from 'react-redux';
import Copyright from '../Shared/Copyright';
import useStyles from '../../Hooks/useStyles';
import { Link } from 'react-router-dom';
import { setAuth } from '../../Redux/action/authentication';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { callNotification } from '../../Redux/reducers/notification';

export const Login = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const isLogged = useSelector(state => state.authenticationReducer.logged);
    const classes = useStyles();
    const [authenticated, setAuthenticated] = useState("");
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        props.traceUser(window.location.pathname);
    }, [])

    useEffect(() => {
        setAuthenticated(localStorage.getItem("client-jwt"));
    }, [])

    const login = () => {
        fetch(`${URL}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: input.email,
                password: sha256(input.password)
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                };
                throw "Login Failed";
            })
            .then(data => {
                console.log(data)
                if (data.body) {
                    dispatch(callNotification(data.message, "success"));
                    props.SetClientLogin(data.body.jwt_token);
                    setAuthenticated(data.body.jwt_token);
                    history.push("/api_management")
                }
                else {
                    dispatch(callNotification(data.message, "warning"));
                }
            })
            .catch(err => {
                console.log(err);
            })
        dispatch(setAuth("true"));
    }

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <i className="fas fa-lock"></i>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="email"
                        id="email"
                        label="e-mail"
                        value={input.username}
                        onChange={handleInput}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="password"
                        id="password"
                        label="Password"
                        value={input.password}
                        onChange={handleInput}
                    />

                    <Button
                        fullWidth
                        margin="normal"
                        className={classes.submit}
                        variant="contained"
                        color="default"
                        onClick={login}
                    >
                        Login
                    </Button>
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Grid container>
                        {/* <Grid item xs>
                            <Link to="#" style={{ textDecoration: 'none', color: "inherit" }}> Forgot password? </Link>
                        </Grid> */}
                        <Grid item>
                            <Link to={"/register"} style={{ textDecoration: 'none', color: "inherit" }}> {"Don't have an account? Sign Up"}</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default connect(null, null)(Login)
