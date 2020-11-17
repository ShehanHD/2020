import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Collapse, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import './dashboard.scss';

function Dashboard() {
    const [toCollapse, setToCollapse] = useState(0);

    const data = [
        {
            id: 1,
            title: "2018 Web Site",
            description: "This is my first proper web site",
            link: 'http://wecode.best:50100',
            img: 'https://lh3.googleusercontent.com/proxy/9nhAFKVWCjhumjgOcHepJPL9SIEBEfsMtcPqevoBss3jwUXXDKUZrGxdUNkpFenUbhvWSTw9gHcz_MntTak',
            list: [
                "I've used basic HTML, CSS, JS for frontend",
                "For backend I've used php"
            ]
        },
        {
            id: 2,
            title: "2019 Web Site",
            description: "This is my second web site",
            link: 'http://wecode.best:50200',
            img: 'https://www.simantel.com/wp-content/uploads/2018/09/2019_trends_900x500-FINAL.jpg',
            list: [
                "I've used basic HTML, CSS, JS for frontend",
                "I've used Materialize also for frontend",
                "For backend I've used php"
            ]
        },
        {
            id: 3,
            title: "Github",
            description: "Github repository",
            link: 'https://github.com/ShehanHD',
            img: 'https://portswigger.net/cms/images/54/14/6efb9bc5d143-article-190612-github-body-text.jpg',
            list: [
                "Frontend scripts",
                "Backend scripts",
                "Database",
                "Frameworks",
            ]
        },
        {
            id: 4,
            title: "Gitlab",
            description: "Gitlab repository",
            link: 'https://gitlab.com/shehanhd',
            img: 'https://www.philipp-doblhofer.at/wp-content/uploads/2019/11/gitlab_hero-1568x692.png',
            list: [
                "Frontend scripts",
                "Backend scripts"
            ]
        }
    ]

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