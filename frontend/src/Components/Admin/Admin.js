import React from 'react';
import { Paper, TextField, Button, Typography } from '@material-ui/core';
import './admin.scss';
import useStyles from '../../Hooks/useStyles';

const Admin = () => {
    const classes = useStyles()

    return (
        <div id="admin">
            <div className="login">
                <form className={classes.form} noValidate>
                    <Typography variant="h4" align={"center"} color="initial">Admin Login</Typography>

                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="username"
                        label="Username"
                        value={""}
                        onChange={(e) => console.log("a")}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="password"
                        label="Password"
                        value={""}
                    //   onChange={}
                    />

                    <Button fullWidth margin="normal" className={classes.submit} variant="contained" color="default">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Admin
