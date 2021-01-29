import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText, MenuList, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { callNotification } from '../../Redux/reducers/notification';

function Exercises() {
    // const isLogged = useSelector(state => state.authenticationReducer.logged);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callNotification("You have to login before you access to some applications"));
        // !isLogged && dispatch(callNotification("You have to login before you access to some applications"));
    }, [dispatch])

    return (
        <div>
            <Typography variant={'h3'}>Exercises</Typography>
            <MenuList>
                <ListItem button component={Link} to={'exercises/todo'} style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItemIcon>
                        <i className={"fas fa-list-ul"}></i>
                    </ListItemIcon>
                    <ListItemText primary={'Todo App'} />
                </ListItem>
            </MenuList>
        </div>
    )
}

export default Exercises
