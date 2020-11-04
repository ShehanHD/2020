import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react'
import { URL } from '../../Shared/api_url';

function Admin() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const [newEvent, setNewEvent] = useState(false);

    useEffect(() => {
        fetch(`${URL}/api/todo/category`)
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
                    setCategories(data)
                }
            });
    }, [newEvent])

    const handleSelectedCategory = (e, value) => {
        if (value) {
            setSelectedCategory(value);
        }
        else {
            setSelectedCategory(null);
        }
    }

    const handleCategoryName = (e) => setCategoryName(e.target.value);

    const handleSubmitCategory = () => {
        try {
            let category = {
                name: categoryName,
                user_id: null
            }

            fetch(`${URL}/api/todo/category`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(category),
            })
                .then(response => {
                    if (response.status === 200) {
                        setCategoryName("");
                        setSelectedCategory(null);
                        setNewEvent(!newEvent);
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

    const selectDeleteCategory = (e, value) => {
        if (value) {
            setSelectedDeleteCategory(value);
        }
        else {
            setSelectedDeleteCategory(null);
        }
    }

    const handleDeleteCategory = () => {
        fetch(`${URL}/api/todo/category/${selectedDeleteCategory.category_id}`, {
            method: "DELETE",
        })
            .then(response => {
                setNewEvent(!newEvent);
                response.json()
            })
            .then(data => {
                console.log(data)
                setSelectedDeleteCategory(null);
            })

    }

    const handleSubCategoryName = (e) => setSubCategoryName(e.target.value);

    const handleSubmitSubCategory = () => {
        try {
            let category = {
                name: subCategoryName,
                category_id: selectedCategory.category_id
            }

            fetch(`${URL}/api/todo/subcategory`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(category),
            })
                .then(response => {
                    if (response.status === 200) {
                        setSubCategoryName("");
                        setSelectedCategory(null);
                        setNewEvent(!newEvent);
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

    return (
        <>
            <Typography variant={'h6'}>Create Category</Typography>
            <Grid container component={Paper} style={{ padding: '3vw' }}>
                <Grid item sm={2} xl={3} />
                <Grid item sm={8} xl={6}>
                    <Grid container spacing={3}>
                        <Grid xs={12} lg={6} item>
                            <TextField
                                fullWidth
                                label="Category Name"
                                value={categoryName}
                                onChange={handleCategoryName}
                            />
                        </Grid>
                        <Grid xs={12} lg={6} item>
                            <Button fullWidth variant={'outlined'} color={'primary'} style={{ marginTop: '1vh' }} onClick={handleSubmitCategory}>Add new Category</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={2} xl={3} />
            </Grid>

            <Typography variant={'h6'}>Delete Category</Typography>
            <Grid container component={Paper} style={{ padding: '3vw' }}>
                <Grid item sm={2} xl={3} />
                <Grid item sm={8} xl={6}>
                    <Grid container spacing={3}>
                        <Grid xs={12} lg={6} item>
                            <Autocomplete
                                autoComplete
                                includeInputInList
                                filterSelectedOptions
                                id="category_id"
                                value={selectedDeleteCategory}
                                onChange={selectDeleteCategory}
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
                        <Grid xs={12} lg={6} item>
                            <Button fullWidth variant={'outlined'} color={'secondary'} style={{ marginTop: '1vh' }} disabled={!selectedDeleteCategory} onClick={handleDeleteCategory}>Delete Category</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={2} xl={3} />
            </Grid>


            <Typography variant={'h6'}>Create Sub Category</Typography>
            <Grid container component={Paper} style={{ padding: '3vw' }}>
                <Grid item sm={2} xl={3} />
                <Grid item sm={8} xl={6}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}>
                        <Grid xs={12} lg={6} item>
                            <Autocomplete
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
                        <Grid xs={12} lg={6} item>
                            <TextField
                                fullWidth
                                label="Todo Name"
                                disabled={!selectedCategory}
                                value={subCategoryName}
                                onChange={handleSubCategoryName}
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <Button fullWidth variant={'outlined'} color={'primary'} style={{ marginTop: '1vh' }} onClick={handleSubmitSubCategory}>Add new Category</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={2} xl={3} />
            </Grid>

        </>
    )
}

export default Admin
