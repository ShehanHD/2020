import React, { useEffect, useState } from 'react'
import { Paper, Tab, Tabs } from '@material-ui/core';
import NewTodos from './NewTodos';
import Admin from './Admin';
import View from './View';
import './todoApp.scss'

function Todos(props) {
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        props.traceUser(window.location.pathname);
    }, [])

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <h1>TODO APP</h1>
            <Paper square style={{ marginBottom: '5vh' }}>
                <Tabs
                    value={selectedTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                >
                    <Tab label="New Todo" />
                    <Tab label="Todos" />
                    <Tab label="Admin" />
                </Tabs>
            </Paper>

            {selectedTab === 0 && <NewTodos />}
            {selectedTab === 1 && <View />}
            {selectedTab === 2 && <Admin />}

        </>
    )
}

export default Todos
