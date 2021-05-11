import { Link } from 'react-router-dom'
import { Typography, MenuList, ListItemIcon, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'

const Api = () => {
    return (
        <>
            <Typography variant={'h3'}>APIs</Typography>
            <MenuList>
                <ListItem button component={Link} to={'/api_management/tracer_api'} style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItemIcon>
                        <i className={"fas fa-list-ul"}></i>
                    </ListItemIcon>
                    <ListItemText primary={'Tracer Api Management'} />
                </ListItem>
            </MenuList>
        </>
    )
}

export default Api
