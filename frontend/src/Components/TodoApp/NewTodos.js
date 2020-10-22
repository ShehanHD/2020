import { Button, Grid, MenuItem, TextField } from '@material-ui/core'
import React from 'react'

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

function NewTodos() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item sm={12} md={3} >
                    <TextField
                        fullWidth
                        label="Todo Name"
                    //   value={}
                    //   onChange={} 
                    />
                </Grid>
                <Grid item sm={12} md={3} >
                    <TextField
                        fullWidth
                        select
                        label="Category"
                        // value={}
                        // onChange={handleChange}
                        helperText="Please select your Category"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item sm={12} md={3} >
                    <TextField
                        fullWidth
                        select
                        disabled
                        label="Sub Category"
                        // value={}
                        // onChange={handleChange}
                        helperText="Please select your Sub Category"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item sm={12} md={3} >
                    <Button fullWidth variant={'contained'} color={'primary'}>Add new todo</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default NewTodos
