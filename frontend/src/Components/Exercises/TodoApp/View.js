import React, { useState, useEffect } from 'react'
import { Checkbox, FormControlLabel, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { URL } from '../../Shared/api_url';
import { useDispatch } from 'react-redux';
import { callNotification } from '../../../Redux/reducers/notification';
import { useConfirm } from 'material-ui-confirm';

function View() {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const [rows, setRows] = useState([]);
    const [newAction, setNewAction] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [closedTodos, setClosedTodos] = useState(true);
    const [openTodos, setOpenTodos] = useState(true);

    useEffect(() => {
        fetch(`${URL}/todo`)
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
                    console.log('====================================');
                    console.log(data);
                    console.log('====================================');
                    setRows(data)
                }
            });
    }, [newAction])

    const closeTodo = (e, id) => {
        e.preventDefault();
        confirm({ description: `Is this todo ready to be closed?` })
            .then(() => {

                fetch(`${URL}/todo/${id}`, {
                    method: "PATCH",
                })
                    .then(response => {
                        if (response.status === 200) {
                            setNewAction(!newAction);
                            dispatch(callNotification("Another todo has been completed", "success"));
                            return response.json()
                        }
                        else {
                            throw response
                        }
                    })
                    .then(data => console.log(data))
                    .catch(e => dispatch(callNotification(e.statusText)))
            })
            .catch(() => console.log("Deletion cancelled."))
    }

    const handleClosedTodos = () => {
        setClosedTodos(!closedTodos);
        setShowAll(!showAll);

        if (!showAll) {
            setOpenTodos(true);
            setClosedTodos(true);
        }
    }

    const handleOpenTodos = () => {
        setOpenTodos(!openTodos);
        setShowAll(!showAll);

        if (!showAll) {
            setOpenTodos(true);
            setClosedTodos(true);
        }
    }

    return (
        <TableContainer component={Paper} style={{ padding: '1vw' }}>
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
                        <TableCell align="center">Expire On</TableCell>
                        <TableCell align="center">State</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(showAll && rows) && rows.map((row) => (<TRow key={row.todos_id} row={row} closeTodo={closeTodo} />))}
                    {(openTodos && !showAll && !closedTodos && rows) && rows.map((row) => (row.is_done === 0 && <TRow key={row.todos_id} row={row} closeTodo={closeTodo} />))}
                    {(closedTodos && !showAll && !openTodos && rows) && rows.map((row) => (row.is_done === 1 && <TRow key={row.todos_id} row={row} closeTodo={closeTodo} />))}
                </TableBody>
            </Table>
        </TableContainer>);
}

export default View


export const TRow = ({ row, closeTodo }) => {
    return (
        <TableRow className={row.is_done === 1 ? "completed" : ""}>
            <TableCell align="center">{row.name}</TableCell>
            <TableCell align="center">{row.category_name}</TableCell>
            <TableCell align="center">{row.sub_name}</TableCell>
            <TableCell align="center">{row.created_on}</TableCell>
            <TableCell align="center">{row.expire_on}</TableCell>
            <TableCell align="center">{row.is_done === 1 ? "Closed" : "Open"}</TableCell>
            <TableCell align="center" value={row.todos_id}>
                {row.is_done === "0" ?
                    <IconButton className="far fa-times-circle" style={{ color: 'red' }} onClick={(e) => closeTodo(e, row.todos_id)} />
                    // <Button fullWidth variant={'outlined'} color={'secondary'} onClick={(e) => closeTodo(e, row.todos_id)} >Close Todo</Button>
                    :
                    <Icon className="far fa-check-circle" style={{ color: 'green' }} />}
            </TableCell>
        </TableRow>
    )
}
