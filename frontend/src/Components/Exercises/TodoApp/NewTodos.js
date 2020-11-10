import { Button, Grid, IconButton, InputAdornment, Paper, TextField, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from '../../../Hooks/useStyles';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { URL } from '../../Shared/api_url';
import { DatePicker, DateTimePicker, KeyboardDateTimePicker, TimePicker } from '@material-ui/pickers';

function NewTodos() {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [name, setName] = useState(null)
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    useEffect(() => {

        fetch(`${URL}/api/todo/category`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((data) => {
                if (data.errorInfo !== null) {
                    setCategories(data)
                }
            })
    }, [])

    const handleName = (e) => setName(e.target.value);

    const handleSubmit = () => {
        try {
            let todo = {
                name,
                category_id: selectedCategory.category_id,
                sub_name: selectedSubCategory.name
            }

            fetch(`${URL}/api/todo`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(todo),
            })
                .then(response => {
                    if (response.status === 201) {
                        setName("");
                        setSelectedCategory(null);
                        setSelectedSubCategory(null);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                })
        } catch (error) {
            console.log(error);
        }

    }

    const handleSelectedCategory = (e, value) => {
        if (value) {
            setSelectedCategory(value);
            fetchSubCategory(value.category_id)
        }
        else {
            setSubCategories([]);
            setSelectedCategory(null);
            setSelectedSubCategory(null);
        }
    }

    const fetchSubCategory = (id) => {
        fetch(`${URL}/api/todo/subcategory/${id}`)
            .then((response) => response.json())
            .then((data) => setSubCategories(data));
    }

    return (
        <>
            <Grid container component={Paper} className={'todo-container'}>
                <Grid item sm={2} xl={3} />
                <Grid item sm={8} xl={6}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >

                        {/* todo name */}
                        <Grid item xs={12} className={classes.root}>
                            <TextField
                                fullWidth
                                label="Todo Name"
                                value={name || ""}
                                onChange={handleName}
                            />
                        </Grid>

                        {/* category */}
                        <Grid item xs={12} className={classes.root}>
                            <Autocomplete
                                className={classes.root}
                                autoComplete
                                includeInputInList
                                filterSelectedOptions
                                id="category_id"
                                value={selectedCategory}
                                onChange={handleSelectedCategory}
                                options={categories || []}
                                getOptionLabel={(categories) => categories.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // error={referenceError}
                                        label="Category"
                                        variant="standard"
                                    // onSelect={() => setReferenceError(false)}
                                    />
                                )}
                            />
                        </Grid>

                        {/* subcategory */}
                        <Grid item xs={12} className={classes.root}>
                            <Autocomplete
                                className={classes.root}
                                autoComplete
                                includeInputInList
                                filterSelectedOptions
                                disabled={subCategories.length === 0}
                                value={selectedSubCategory}
                                onChange={(e, v) => setSelectedSubCategory(v)}
                                options={subCategories || []}
                                getOptionLabel={(subCategories) => subCategories.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // error={referenceError}
                                        label="Sub Category"
                                        variant="standard"
                                    // onSelect={() => setReferenceError(false)}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <DateTimePicker
                                fullWidth
                                autoOk
                                hideTabs
                                ampm={false}
                                // value={selectedDate}
                                // onChange={handleDateChange}
                                label="Due Date"
                                onError={console.log}
                                minDate={new Date()}
                                format="yyyy/MM/dd hh:mm"
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                            <Button fullWidth variant={'contained'} color={'primary'} onClick={handleSubmit}>Add new todo</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={2} xl={3} />
            </Grid>
        </>
    )
}

export default NewTodos
