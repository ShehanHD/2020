import { Button, Grid, Paper, TextField, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from '../../Hooks/useStyles';
import Autocomplete from "@material-ui/lab/Autocomplete";


function NewTodos() {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [name, setName] = useState(null)
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/2020/backend/api/todo/category`)
            .then((response) => response.json())
            .then((data) => setCategories(data));
    }, [])

    const handleName = (e) => setName(e.target.value);

    const handleSubmit = () => {
        try {
            let todo = {
                name,
                category_id: selectedCategory.category_id,
                sub_name: selectedSubCategory.name
            }

            fetch(`http://localhost:8080/2020/backend/api/todo`, {
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
        fetch(`http://localhost:8080/2020/backend/api/todo/subcategory/${id}`)
            .then((response) => response.json())
            .then((data) => setSubCategories(data));
    }

    return (
        <>
            <Grid container component={Paper} style={{ padding: '3vw' }}>
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
