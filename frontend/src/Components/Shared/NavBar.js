import { AppBar, Avatar, Card, CardHeader, CardMedia, CssBaseline, Divider, Drawer, IconButton, ListItem, ListItemIcon, ListItemText, MenuList, Paper, SwipeableDrawer, Toolbar, Typography, useTheme } from '@material-ui/core';
import React, { useState } from 'react'
import useStyles from '../../Hooks/useStyles';
import clsx from "clsx";
import { Link } from 'react-router-dom';

function NavBar(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = useState(false);

    const toggleDrawer = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                color={"default"}
            >
                <Toolbar component={Paper}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <i className="fas fa-bars"></i>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        weCode 2020
                </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
                onClick={open ? toggleDrawer : null}
                onKeyDown={toggleDrawer}
            >
                <div className={classes.toolbar}>
                    <IconButton className={classes.arrow} onClick={toggleDrawer}>
                        <i className="fas fa-arrow-left"></i>
                    </IconButton>
                </div>

                <Divider />
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="aa" style={{ marginLeft: '-8px' }}>
                                G
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="">
                                <i className="fas fa-ellipsis-v" style={{ fontSize: '14px' }}></i>
                            </IconButton>
                        }
                        title="Guest User"
                        subheader="Description"
                    />
                </Card>
                <Divider />

                <MenuList>
                    <NavItem path={'/'} icon={"far fa-compass"} text={'Dashboard'} />
                    <NavItem path={'/covid'} icon={"fas fa-hands-wash"} text={'Covid'} />
                    <NavItem path={'/exercises'} icon={"far fa-hdd"} text={'Exercises'} />
                </MenuList>

                <Divider />

                <MenuList>
                    <ListItem button onClick={props.toggleDarkTheme}>
                        <ListItemIcon>
                            <i className={"fas fa-magic menu-icon"}></i>
                        </ListItemIcon>
                        <ListItemText primary={"Switch Theme"} />
                    </ListItem>
                </MenuList>
            </Drawer>
        </div>
    )
}

export default NavBar


const NavItem = ({ path, icon, text }) => {
    return (
        <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
                <ListItemIcon>
                    <i className={icon + " menu-icon"}></i>
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        </Link>
    )
}