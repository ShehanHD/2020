import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText, MenuList } from '@material-ui/core'
function Exercises() {
    return (
        <div>
            <MenuList>
                <Link to={'exercise/todo'} style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <i className={"fas fa-list-ul"}></i>
                        </ListItemIcon>
                        <ListItemText primary={'Todos'} />
                    </ListItem>
                </Link>
            </MenuList>
        </div>
    )
}

export default Exercises
