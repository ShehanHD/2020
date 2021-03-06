import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useConfirm } from 'material-ui-confirm';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { callNotification } from '../../../Redux/reducers/notification';
import { URL } from '../../Shared/api_url';

function Admin() {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const [newEvent, setNewEvent] = useState(false);
    const confirm = useConfirm();

    useEffect(() => {
        fetch(`${URL}/todo/category`)
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

            fetch(`${URL}/todo/category`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(category),
            })
                .then(response => {
                    if (response.status === 201) {
                        setCategoryName("");
                        setSelectedCategory(null);
                        setNewEvent(!newEvent);
                        dispatch(callNotification("A new category successfully Added", "success"))
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                })
                .then(data => {
                    console.log(data)
                })
                .catch(e => dispatch(callNotification(e.status + " " + e.statusText)))
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
        confirm({ description: `This will permanently delete category '${selectedDeleteCategory.name}'` })
            .then(() => {
                fetch(`${URL}/todo/category/${selectedDeleteCategory.category_id}`, {
                    method: "DELETE",
                })
                    .then(response => {
                        if (response.status === 200) {
                            setCategories(categories.filter(item => item.category_id !== selectedDeleteCategory.category_id));
                            return response.json()
                        }
                        else { throw response; }
                    })
                    .then(data => {
                        setSelectedDeleteCategory(null);
                        dispatch(callNotification("Category successfully deleted", "success"))
                    })
                    .catch(e => dispatch(callNotification(e.statusText)))
            })
            .catch(() => {
                console.log("Deletion cancelled.");
                // dispatch(callNotification("Deletion cancelled.", "info"))
            });
    }

    const handleSubCategoryName = (e) => setSubCategoryName(e.target.value);

    const handleSubmitSubCategory = () => {
        try {
            let category = {
                name: subCategoryName,
                category_id: selectedCategory.category_id
            }

            fetch(`${URL}/todo/subcategory`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(category),
            })
                .then(response => {
                    if (response.status === 201) {
                        setSubCategoryName("");
                        setSelectedCategory(null);
                        setNewEvent(!newEvent);
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                })
                .then(data => {
                    dispatch(callNotification("Subcategory '" + data.name + "' successfully Added", "success"))
                })
                .catch(e => {
                    dispatch(callNotification(e.status + " " + e.statusText))
                })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Typography variant={'h5'} >Create Category</Typography>
            <Grid container component={Paper} className={'todo-container'}>
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

            <Typography variant={'h5'}>Create Subcategory</Typography>
            <Grid container component={Paper} className={'todo-container'}>
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
                                label="Subcategory Name"
                                disabled={!selectedCategory}
                                value={subCategoryName}
                                onChange={handleSubCategoryName}
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <Button fullWidth variant={'outlined'} color={'primary'} style={{ marginTop: '1vh' }} onClick={handleSubmitSubCategory}>Add new Sub Category</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={2} xl={3} />
            </Grid>

            <Typography variant={'h5'}>Delete Category</Typography>
            <Grid container component={Paper} className={'todo-container'}>
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

        </>
    )
}

export default Admin
