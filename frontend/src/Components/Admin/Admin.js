import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core';
import './admin.scss';
import useStyles from '../../Hooks/useStyles';
import { URL } from '../Shared/api_url';
import sha256 from 'sha256'
import { callAuthentication } from '../../Redux/reducers/authentication';
import { callNotification } from '../../Redux/reducers/notification';
import AuthenticatedAdmin from './AuthenticatedAdmin';

const Admin = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState("");

    useEffect(() => {
        setAuthenticated(localStorage.getItem("admin-jwt"));
    }, [])

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = () => {
        fetch(`${URL}/auth/admin_login`, {
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
                if (response.status === 202) {
                    return response.json()
                };
                throw "Login Failed";
            })
            .then(data => {
                dispatch(callNotification(data.message, "success"));
                localStorage.setItem("admin-jwt", data.jwt_token);
                setAuthenticated(data.jwt_token);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div id="admin">
            {
                authenticated === "" ? <AdminLogin handleSubmit={handleSubmit} handleInput={handleInput} input={input} /> : <AuthenticatedAdmin setAuthenticated={setAuthenticated} />
            }
        </div>
    )
}

export default Admin

export const AdminLogin = ({ handleSubmit, handleInput, input }) => {
    const classes = useStyles();

    return (
        <div className="login">
            <form className={classes.form} noValidate>
                <Typography variant="h4" align={"center"} color="initial">Admin Login</Typography>

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
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </form>
        </div>

    )
}

