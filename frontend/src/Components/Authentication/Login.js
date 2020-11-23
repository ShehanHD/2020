import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect, useDispatch, useSelector } from 'react-redux';
import { callAuthentication } from '../../Redux/reducers/authentication'
import Copyright from '../Shared/Copyright';
import useStyles from '../../Hooks/useStyles';
import { Link } from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.authenticationReducer.logged);
    const classes = useStyles();

    useEffect(() => {
        isLogged && dispatch(callAuthentication(false));
    }, [isLogged, dispatch])

    const login = () => {
        dispatch(callAuthentication(true))
        window.history.back();
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
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#" style={{ textDecoration: 'none', color: "inherit" }}> Forgot password? </Link>
                        </Grid>
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
