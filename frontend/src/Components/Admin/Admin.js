import React from 'react';
import { Paper, TextField } from '@material-ui/core';
import './admin.scss';

const Admin = () => {
    return (
        <div id="#admin">
            <div className="login">
                <TextField
                    name="username"
                    label="Username"
                    value={""}
                    onChange={(e) => console.log("a")}
                />
            </div>
        </div>
    )
}

export default Admin
