import React, { useState, useEffect } from 'react'
import { Checkbox, FormControlLabel, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

function View() {
    const [rows, setRows] = useState([]);
    const [newAction, setNewAction] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [closedTodos, setClosedTodos] = useState(false);
    const [openTodos, setOpenTodos] = useState(false);

    useEffect(() => {
        fetch(`http://rasphd.ddns.net:8080/2020/backend/api/todo`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
                else {
                    throw response;
                }
            })
            .then((data) => {
                if (data.errorInfo !== null) {
                    setRows(data)
                }
            });
    }, [newAction])

    const handleDelete = (e, id) => {
        e.preventDefault();

        fetch(`http://rasphd.ddns.net:8080/2020/backend/api/todo/${id}`, {
            method: "PATCH",
        })
            .then(response => {
                setNewAction(!newAction);
                response.json()
            })
            .then(data => console.log(data))
    }

    const handleShowAll = () => {
        if (!showAll) {
            setClosedTodos(true);
            setOpenTodos(true);
        }
        else {
            setClosedTodos(false);
            setOpenTodos(true);
        }
        setShowAll(!showAll);
    };

    const handleClosedTodos = () => {
        setClosedTodos(!closedTodos);
        setShowAll(!showAll);
    }

    const handleOpenTodos = () => {
        setOpenTodos(!openTodos);
        setShowAll(!showAll);
    }

    return (
        <TableContainer component={Paper} style={{ padding: '1vw' }}>
            <FormControlLabel
                control={<Checkbox color="primary" checked={showAll} />}
                onChange={handleShowAll}
                label="Show All"
                labelPlacement="start"
            />
            <FormControlLabel
                control={<Checkbox color="primary" checked={openTodos} />}
                onChange={handleOpenTodos}
                label="Open Todos"
                labelPlacement="start"
            />
            <FormControlLabel
                control={<Checkbox color="primary" checked={closedTodos} />}
                onChange={handleClosedTodos}
                label="Closed Todos"
                labelPlacement="start"
            />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>TODO</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Sub Category</TableCell>
                        <TableCell align="center">Created Date</TableCell>
                        <TableCell align="center">State</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(showAll && rows) && rows.map((row) => (<TRow key={row.todos_id} row={row} handleDelete={handleDelete} />))}
                    {(openTodos && !showAll && !closedTodos && rows) && rows.map((row) => (row.is_done === 0 && <TRow key={row.todos_id} row={row} handleDelete={handleDelete} />))}
                    {(closedTodos && !showAll && !openTodos && rows) && rows.map((row) => (row.is_done === 1 && <TRow key={row.todos_id} row={row} handleDelete={handleDelete} />))}
                </TableBody>
            </Table>
        </TableContainer>);
}

export default View


export const TRow = ({ row, handleDelete }) => {
    return (
        <TableRow className={row.is_done === 1 ? "completed" : ""}>
            <TableCell align="center">{row.name}</TableCell>
            <TableCell align="center">{row.category_name}</TableCell>
            <TableCell align="center">{row.sub_name}</TableCell>
            <TableCell align="center">{row.created_on}</TableCell>
            <TableCell align="center">{row.is_done === 1 ? "Closed" : "Open"}</TableCell>
            <TableCell align="center" value={row.todos_id}>
                {row.is_done === 0 ?
                    <IconButton className="far fa-times-circle" style={{ color: 'red' }} onClick={(e) => handleDelete(e, row.todos_id)} />
                    // <Button fullWidth variant={'outlined'} color={'secondary'} onClick={(e) => handleDelete(e, row.todos_id)} >Close Todo</Button>
                    :
                    <Icon className="far fa-check-circle" style={{ color: 'green' }} />}
            </TableCell>
        </TableRow>
    )
}
