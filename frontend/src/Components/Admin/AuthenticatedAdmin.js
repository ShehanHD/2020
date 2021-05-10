import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { SITE_ID, URL } from '../Shared/api_url'
import { useState } from 'react'

const AuthenticatedAdmin = ({ setAuthenticated }) => {
    const [roots, setRoots] = useState([]);
    const [leafs, setLeafs] = useState([]);

    const handleLogout = () => {
        localStorage.setItem("admin-jwt", "");
        setAuthenticated("");
    }

    const getTrace = () => {
        fetch(`${URL}/trace/get_by/${SITE_ID}`)
            .then(response => response.json())
            .then(data => {
                console.log([...new Set(data.map(a => a.ip))])
                console.log(data)
            })
            .catch(err => console.error(err))
    }

    return (
        <div className={"auth"}>
            <div className="menu">
                <Button variant="outlined" color="secondary" onClick={handleLogout}> Logout </Button>
            </div>
            {getTrace()}
            <Typography align={"center"} variant="h3" color="initial">Site Visits</Typography>


        </div>
    )
}

export default AuthenticatedAdmin
