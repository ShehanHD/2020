import { BottomNavigation, BottomNavigationAction, Paper } from '@material-ui/core'
import React from 'react'

function NavBar() {
    return (
        <>
            <BottomNavigation
                // value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                showLabels
                component={Paper}
            // className={classes.root}
            >
                <BottomNavigationAction label="Home" />
                <BottomNavigationAction label="Exercises" />
                <BottomNavigationAction label="About" />
            </BottomNavigation>
        </>
    )
}

export default NavBar
