import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Collapse, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import './dashboard.scss';
import { SITE_ID, URL } from '../Shared/api_url';

function Dashboard(props) {
    const [toCollapse, setToCollapse] = useState(0);
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`${URL}/site_management/details/${SITE_ID}/dashboard`,
        )
            .then(res => {
                if (res.status === 200) { return res.json() }
                else { throw res };
            })
            .then(data => {
                setData(JSON.parse(data.body[0].page_data));
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    useEffect(() => {
        props.traceUser(window.location.pathname === "/" ? "/dashboard" : window.location.pathname);
    }, [])

    const handleExpand = (e, id) => {
        toCollapse === id ? setToCollapse(0) : setToCollapse(id);
    }

    return (
        <>
            <Typography variant={'h3'}>Dashboard</Typography>

            <Grid container spacing={2} style={{ marginTop: '1vh' }}>
                {data && data.map(element => <DetailCard key={element.id} id={element.id} title={element.title} img={element.img} description={element.description} list={element.list} link={element.link} toCollapse={toCollapse} handleExpand={handleExpand} />)}
            </Grid>
        </>
    )
}

export default Dashboard


export const DetailCard = ({ id, title, img, description, list, link, toCollapse, handleExpand }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card className={'dashboard-shadow dashboard-load-in'}>
                <CardMedia
                    style={{ height: '20vh' }}
                    image={img}
                    title="Office"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'center' }}> {title}  <a rel="noreferrer" target="_blank" href={link}><i className="fas fa-external-link-alt"></i></a></Typography>
                    <Typography color="textSecondary" style={{ textAlign: 'center' }}>{description}</Typography>
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                    <IconButton color={'primary'} className={'dashboard-expand'} onClick={(e) => handleExpand(e, id)}>
                        <i className="fas fa-angle-down"></i>
                    </IconButton>
                </CardActions>
                <Collapse in={id === toCollapse} timeout="auto" >
                    <CardContent>
                        {list && list.map((element, index) => <Typography key={index} paragraph>{element}</Typography>)}
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}