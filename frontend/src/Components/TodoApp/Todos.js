import React from 'react'
import { Breadcrumbs, Link as L } from '@material-ui/core'
import { Link } from 'react-router-dom';

function Todos() {
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <L to={'todo/admin'} component={Link}>Admin</L>
                <L to={'todo/newTodo'} component={Link}>New Todos</L>
            </Breadcrumbs>

        </>
    )
}

export default Todos
