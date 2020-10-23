import { AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuList, Paper, Toolbar, Typography, useTheme } from '@material-ui/core';
import React from 'react'
import useStyles from '../../Hooks/useStyles';
import clsx from "clsx";
import { Link } from 'react-router-dom';

function NavBar(props) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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
                        onClick={handleDrawerOpen}
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
            >
                <div className={classes.toolbar}>
                    <IconButton className={classes.arrow} onClick={handleDrawerClose}>
                        <i className="fas fa-arrow-left"></i>
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <MenuList>
                        <Link to={'/todo'} style={{ textDecoration: "none", color: "inherit" }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <i className={"fas fa-list-ul"}></i>
                                </ListItemIcon>
                                <ListItemText primary={'Todos'} />
                            </ListItem>
                        </Link>
                    </MenuList>
                </List>

                <Divider />
                <List>
                    <MenuList>
                        <ListItem button onClick={props.toggleDarkTheme}>
                            <ListItemIcon>
                                <i className={"fas fa-adjust"}></i>
                            </ListItemIcon>
                            <ListItemText primary={"Switch Theme"} />
                        </ListItem>
                    </MenuList>
                </List>
            </Drawer>
        </div>
    )
}

export default NavBar
