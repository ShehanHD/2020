import React from 'react'
import { Paper, Tab, Tabs } from '@material-ui/core';
import NewTodos from './NewTodos';
import Admin from './Admin';
import './todoApp.scss'

function Todos() {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <h1>TODO APP</h1>
            <Paper square style={{ marginBottom: '2vh' }}>
                <Tabs
                    value={selectedTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                >
                    <Tab label="Todos" />
                    <Tab label="Admin" />
                </Tabs>
            </Paper>
            {
                selectedTab === 0 ? <NewTodos /> : <Admin />
            }
        </>
    )
}

export default Todos
