import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText, MenuList, Typography } from '@material-ui/core'
function Exercises() {
    return (
        <div>
            <Typography variant={'h3'}>Exercises</Typography>
            <MenuList>
                <Link to={'exercises/todo'} style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <i className={"fas fa-list-ul"}></i>
                        </ListItemIcon>
                        <ListItemText primary={'Todo App'} />
                    </ListItem>
                </Link>
            </MenuList>
        </div>
    )
}

export default Exercises
