import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from '@material-ui/core';
import { data } from './data'
import './BP.scss';

function BP() {
    const handleClick = (e) => {
        console.log(e.currentTarget.id);
    }
    return (
        <div id="bp">
            <Typography variant={"h3"}>Hotel Business Plan</Typography>

            {data.map(item =>
                <article key={item.id} id={item.id}>
                    <Typography variant={"h5"}>{item.title}</Typography>
                    <p>{item.description}</p>


                    {item.subHeaders.length !== 0 && <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Sotto voci
                            </ListSubheader>
                        }>
                        {item.subHeaders.map(sub =>
                            <ListItem button id={sub.id} key={sub.id} onClick={handleClick}>
                                <ListItemIcon>
                                    <i className="fas fa-arrow-right"></i>
                                </ListItemIcon>
                                <ListItemText primary={sub.tittle} />
                            </ListItem>
                        )}
                    </List>}
                </article >
            )
            }

        </div >
    )
}

export default BP
