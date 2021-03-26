import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Modal, TextField, Typography } from '@material-ui/core';
import { useConfirm } from 'material-ui-confirm';
import { URL } from '../../Shared/api_url';

import './Student.scss'

function Student() {
    const confirm = useConfirm();
    const [dataSource, setDataSource] = useState([]);
    const [auditSource, setAuditSource] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);

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
    }, [dataSource])

    const submitDelete = (e, id) => {
        confirm({ description: `This User will permanently delete` })
            .then(() => {
                fetch(URL + '/api/student/delete/' + encodeURIComponent(id), {
                    method: 'DELETE',
                }).then((response) => {
                    if (response.status === 200) {
                        setDataSource(dataSource.filter(element => element.IdStudente !== id));
                        console.log("Successfully removed a user", "success")
                    }
                    else {
                        console.log('====================================');
                        console.log(response);
                        console.log('====================================');
                    }
                })
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
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
            })
    }

    return (
        <>
            <Table data={auditSource} />

            <Grid container spacing={2} style={{ marginTop: '1vh' }}>
                {dataSource.length !== 0 && dataSource.map(element => <StudentCard key={element.IdStudente} element={element} handleDelete={submitDelete} handleUpdate={handleUpdate} />)}
            </Grid>


            {modalIsOpen && <StudentModal element={selectedUser} setModalIsOpen={setModalIsOpen} submitUpdate={submitUpdate} />}
        </>
    )
}

export default Student

export const StudentCard = ({ element, handleDelete, handleUpdate }) => {
    return (
        <Grid item xs={12} sm={4} lg={3} xl={2} >
            <Card className={'v-shadow load-in'}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="">
                            {element.Nominativo[0]}
                        </Avatar>
                    }
                    title={element.Nominativo}
                    subheader={element.eta}
                />
                <CardMedia
                    style={{ height: '15vh' }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm2KGKceVMKcoz-DPXJ739iTqf2pI--EN3zw&usqp=CAU"
                    title="Office"
                />
                <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="textSecondary" component="h5">{element.NatoIl}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h5">{element.Ripetente}</Typography>
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

export const StudentModal = ({ element, setModalIsOpen, submitUpdate }) => {
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
            { data.length !== 0 &&
                <Dialog
                    open={true}
                    onClose={() => setModalIsOpen(false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Edit</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={1} />
                            <Grid item xs={10}>
                                <TextField style={{ marginTop: '1vh' }} fullWidth label="Nome" name="Nominativo" value={data.Nominativo} onChange={handleInput} />
                                <TextField style={{ marginTop: '1vh' }} fullWidth label="Eta" name="eta" value={data.eta} onChange={handleInput} disabled />
                                <TextField style={{ marginTop: '1vh' }} fullWidth label="Nato Il" name="NatoIl" value={data.NatoIl} onChange={handleInput} disabled />
                                <TextField style={{ marginTop: '1vh' }} fullWidth label="Ripetente" name="Ripetente" value={data.Ripetente} onChange={handleInput} disabled />
                            </Grid>
                            <Grid item xs={1} />
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' onClick={() => setModalIsOpen(false)}>Cancel</Button>
                        <Button variant='contained' onClick={() => submitUpdate(data)}>Done</Button>
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
                    <th>ID</th>
                    <th>Data</th>
                    <th>Vechchio</th>
                    <th>Nuovo</th>
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
                        <td>{row.Azione}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}