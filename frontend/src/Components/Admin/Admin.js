import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import './admin.scss';
import useStyles from '../../Hooks/useStyles';
import { URL } from '../Shared/api_url';


const Admin = () => {
    const classes = useStyles();
    const [input, setInput] = useState({
        username: "",
        password: ""
    })
    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = () => {
        fetch(`${URL}/api/auth`)
            .then(res => console.log(res))
    }

    return (
        <div id="admin">
            <div className="login">
                <form className={classes.form} noValidate>
                    <Typography variant="h4" align={"center"} color="initial">Admin Login</Typography>

                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        id="username"
                        label="Username"
                        value={input.username}
                        onChange={handleInput}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
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
        </div>
    )
}

export default Admin
