import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@material-ui/core';
import { useConfirm } from 'material-ui-confirm';
import { URL } from '../../Shared/api_url';

import './Student.scss'
import { callNotification } from '../../../Redux/reducers/notification';
import { useDispatch } from 'react-redux';

function Student(props) {
    const confirm = useConfirm();
    const [dataSource, setDataSource] = useState([]);
    const [auditSource, setAuditSource] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);
    const [isUpdate, setIsUpdate] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        props.traceUser(window.location.pathname);
    }, [])

    useEffect(() => {
        fetch(URL + '/api/student/students')
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
                else {
                    throw response;
                }
            })
            .then((data) => setDataSource(data))
    }, [])

    useEffect(() => {
        getStudentAudit();
    }, [dataSource])

    const getStudentAudit = () => {
        fetch(URL + '/api/student/students_audit')
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
                else {
                    throw response;
                }
            })
            .then((data) => setAuditSource(data))
    }

    const handleClose = () => {
        setModalIsOpen(false);
        setModalIsOpen(false);
        setIsUpdate(true);
    }

    const submitDelete = (e, id) => {
        confirm({ description: `This User will permanently delete` })
            .then(() => {
                fetch(URL + '/api/student/delete/' + encodeURIComponent(id), {
                    method: 'DELETE',
                }).then((response) => {
                    if (response.status === 200) {
                        setDataSource(dataSource.filter(element => element.IdStudente !== id));
                        dispatch(callNotification("Successfully removed a user", "success"));
                        setModalIsOpen(false);
                    }
                    else {
                        console.log(response);
                    }
                })
                    .catch(err => dispatch(callNotification(err.errorInfo[2])))
            })
            .catch(() => {
                console.log("Deletion cancelled.");
            });
    }

    const handleUpdate = (e, id) => {
        let selected = dataSource.filter(element => id === element.IdStudente);

        setSelectedUser(...selected);
        setModalIsOpen(true);
    }

    const handleInsert = (e) => {
        setSelectedUser([]);
        setIsUpdate(false);
        setModalIsOpen(true);
    }

    const submitUpdate = (data) => {
        let filtered = dataSource.filter(element => element.IdStudente !== data.IdStudente);
        let items = [...filtered, data];
        items.sort((a, b) => a.IdStudente - b.IdStudente);

        fetch(`${URL}/api/student/setName`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ IdStudente: data.IdStudente, Nominativo: data.Nominativo }),
        })
            .then(response => {
                if (response.status === 201) {
                    setDataSource(items);
                    dispatch(callNotification("Successfully updated a user", "success"));
                }
                if (response.status === 203) {
                    dispatch(callNotification("Nothing to update", "warning"));
                }

                setModalIsOpen(false);
            })
            .catch(err => console.log(err))
    }

    const submitInsert = (data) => {
        fetch(`${URL}/api/student/new`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.status === 201) {
                    setModalIsOpen(false);
                }
                return response.json();
            })
            .then(newId => {
                if (newId.errorInfo) {
                    dispatch(callNotification(newId.errorInfo[2]));
                } else {
                    data.IdStudente = newId.IdStudente;
                    setDataSource([...dataSource, data]);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const clearTable = () => {
        confirm({ description: `This User will permanently clear the table?` })
            .then(() => {
                fetch(URL + '/api/student/delete_student_audit/', {
                    method: 'DELETE',
                }).then((response) => {
                    if (response.status === 200) {
                        getStudentAudit();
                        dispatch(callNotification("Successfully cleared a TABELLA AUDIT STUDENTI", "success"));
                    }
                    else {
                        console.log(response);
                    }
                })
            })
            .catch(() => {
                console.log("Deletion cancelled.");
            });
    }

    return (
        <div id="student">
            <div>
                <Typography variant={"h4"}>Tablella Audit Studenti</Typography>
                <Button variant={"contained"} color={"secondary"} onClick={clearTable}>Clear Data</Button>
            </div>
            <Table data={auditSource} />

            <Grid container spacing={2} style={{ marginTop: '1vh' }}>
                {dataSource.length !== 0 && dataSource.map(element => <StudentCard key={element.IdStudente} element={element} handleDelete={submitDelete} handleUpdate={handleUpdate} />)}
            </Grid>

            {
                modalIsOpen &&
                <StudentModal
                    element={selectedUser}
                    handleClose={handleClose}
                    submitUpdate={submitUpdate}
                    submitInsert={submitInsert}
                    isUpdate={isUpdate}
                />
            }


            <Button className={'new-student'} variant="contained" color="primary" onClick={handleInsert}>
                <i className="fas fa-user-plus">Nuovo Studente</i>
            </Button>
        </div >
    )
}

export default Student

export const StudentCard = ({ element, handleClose, handleDelete, handleUpdate }) => {
    return (
        <Grid item xs={12} sm={4} lg={3} xl={2} >
            <Card className={'v-shadow load-in'}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="">
                            {element.Nominativo[0]}
                        </Avatar>
                    }
                    title={element.Nominativo + " (Classe " + element.Classe + ")"}
                    subheader={"Voto Media: " + element.MediaVoti}
                />
                <CardMedia
                    style={{ height: '15vh' }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm2KGKceVMKcoz-DPXJ739iTqf2pI--EN3zw&usqp=CAU"
                    title="Office"
                />
                <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="textSecondary" component="h5">Nato Il: {element.NatoIl.split(" ")[0]}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h5">{"Età: " + element.Eta}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h5">{element.Ripetente !== "1" && "Non "} Ripetente</Typography>
                    <Typography variant="body2" color="textSecondary" component="h5">{element.Sesso}</Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">Team: {element.team}</Typography> */}
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                    <IconButton aria-label="Edit" onClick={(e) => handleUpdate(e, element.IdStudente)}>
                        <i className="fas fa-edit"></i>
                    </IconButton>
                    <IconButton aria-label="Delete" color={'secondary'} onClick={(e) => handleDelete(e, element.IdStudente)}>
                        <i className="fas fa-trash-alt"></i>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

export const StudentModal = ({ element, handleClose, submitUpdate, submitInsert, isUpdate }) => {
    const [data, setData] = useState(element);

    const handleInput = (e) => {
        let key = e.target.name;
        let value = e.target.value

        setData({
            ...data,
            [key]: value
        })
    }

    return (
        <>
            {
                <Dialog
                    open={true}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Edit</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={1} />
                            <Grid item xs={10}>
                                <TextField style={{ marginTop: '1vh' }} fullWidth label="Nome" name="Nominativo" value={data.Nominativo || ""} onChange={handleInput} />
                                <TextField style={{ marginTop: '1vh' }} type={"number"} fullWidth label="Eta" name="Eta" value={data.Eta || ""} onChange={handleInput} disabled={isUpdate} />
                                <TextField
                                    style={{ marginTop: '1vh' }}
                                    fullWidth
                                    type="date"
                                    label="Nato Il"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="NatoIl"
                                    value={data.NatoIl ? (data.NatoIl.split(" ")[0]) : ""}
                                    onChange={handleInput}
                                    disabled={isUpdate}
                                />
                                <TextField style={{ marginTop: '1vh' }} fullWidth label="Classe" name="Classe" value={data.Classe || ""} onChange={handleInput} disabled={isUpdate} />
                                {/* <TextField style={{ marginTop: '1vh' }} fullWidth label="Ripetente" name="Ripetente" value={(data.Ripetente !== "1" ? "Non Ripetente" : "Ripetente") || ""} onChange={handleInput} disabled={isUpdate} /> */}
                                <FormControl fullWidth style={{ marginTop: '1vh' }}>
                                    <InputLabel id="Ripetente-select-label">Ripetente</InputLabel>
                                    <Select
                                        labelId="Ripetente-select-label"
                                        id="Ripetente-select"
                                        value={data.Ripetente || ""}
                                        name="Ripetente"
                                        onChange={handleInput}
                                        disabled={isUpdate}
                                    >
                                        <MenuItem value={"1"}>Ripetente</MenuItem>
                                        <MenuItem value={"0"}>Non Ripetente</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth style={{ marginTop: '1vh' }}>
                                    <InputLabel id="sesso-simple-select-label">Sesso</InputLabel>
                                    <Select
                                        labelId="sesso-simple-select-label"
                                        id="sesso-simple-select"
                                        value={data.Sesso || ""}
                                        name="Sesso"
                                        onChange={handleInput}
                                        disabled={isUpdate}
                                    >
                                        <MenuItem value={"Femmina"}>Femmina</MenuItem>
                                        <MenuItem value={"Maschio"}>Maschio</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* <TextField style={{ marginTop: '1vh' }} fullWidth label="Sesso" name="Sesso" value={data.Sesso || ""} onChange={handleInput} disabled={isUpdate} /> */}
                                <TextField style={{ marginTop: '1vh' }} fullWidth type={"number"} label="Voto Media" name="MediaVoti" value={data.MediaVoti || 0} onChange={handleInput} disabled={isUpdate} />
                            </Grid>
                            <Grid item xs={1} />
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' onClick={() => (isUpdate ? submitUpdate(data) : submitInsert(data))}>Done</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}


export const Table = ({ data }) => {
    return (
        <table id="studentTable">
            <thead>
                <tr>
                    <th>ID Studente</th>
                    <th>Data e Ora</th>
                    <th>Vechchio Nome</th>
                    <th>Nuovo Nome</th>
                    <th>Azione</th>
                </tr>
            </thead>

            <tbody>
                {data.map(row =>
                    <tr key={row.IdAudit}>
                        <td>{row.IdStudente}</td>
                        <td>{row.CambiatoIl}</td>
                        <td>{row.OldNominativo}</td>
                        <td>{row.NewNominativo}</td>
                        <td style={{ color: (row.Azione === "DELETE" && "red") }}>{row.Azione}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}