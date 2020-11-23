import React from 'react'
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to="/" style={{ color: "inherit" }}> www.wecode.best </Link>
            {' ' + new Date().getFullYear() + '.'}
        </Typography>
    );
}

export default Copyright
