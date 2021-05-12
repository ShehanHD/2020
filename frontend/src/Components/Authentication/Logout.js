import React from 'react'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Logout = (props) => {
    let history = useHistory();

    const setClientLogout = () => {
        localStorage.setItem("client-jwt", "");
        props.setIsLogged(false);
        history.push("/");
    }

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={setClientLogout}>
                Logout
            </Button>
        </div>
    )
}

export default Logout
