import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import sha256 from 'sha256'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect, useDispatch } from 'react-redux'
import Copyright from '../Shared/Copyright';
import useStyles from '../../Hooks/useStyles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { callNotification } from '../../Redux/reducers/notification';
import { URL } from '../Shared/api_url';

export const Register = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState("");
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        re_password: ""
    })

    useEffect(() => {
        props.traceUser(window.location.pathname);
    }, [])

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submit = () => {

        fetch(`${URL}/auth/registration`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: form.name,
                surname: form.surname,
                email: form.email,
                password: sha256(form.password),
                re_password: sha256(form.re_password)
            }),
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json()
                };
                throw "Registration Failed";
            })
            .then(data => {
                dispatch(callNotification(data.message, "success"));
                localStorage.setItem("admin-jwt", data.jwt_token);
                setAuthenticated(data.jwt_token);
            })
            .catch(err => {
                dispatch(callNotification(err, "error"));
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <i className="fas fa-lock"></i>
                </Avatar>
                <Typography component="h1" variant="h5">Sign up</Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onInput={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="surname"
                                label="Surname"
                                name="surname"
                                onInput={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onInput={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onInput={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="re_password"
                                label="Repeat Password"
                                type="password"
                                id="re_password"
                                onInput={handleInput}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to={'/login'} href="#" variant="body2" style={{ textDecoration: 'none', color: "inherit" }}>Already have an account? Sign in</Link>
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

export default connect(null, null)(Register)