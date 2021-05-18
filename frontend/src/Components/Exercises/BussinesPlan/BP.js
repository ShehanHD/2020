import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import './BP.scss';
import { SITE_ID, URL } from '../../Shared/api_url';

function BP(props) {
    const [data, setData] = useState([])


    useEffect(() => {
        fetch(`${URL}/site_management/details/${SITE_ID}/business-plan`,
        )
            .then(res => {
                if (res.status === 200) { return res.json() }
                else { throw res };
            })
            .then(data => {
                console.log(JSON.parse(data[0].page_data))
                setData(JSON.parse(data.body[0].page_data));
            })
            .catch(err => {
                console.error(err);
            })
    }, [])


    useEffect(() => {
        props.traceUser(window.location.pathname);
    }, [])

    const handleClick = (e) => {
        console.log(e.currentTarget.id);
    }

    return (
        <div id="bp">
            <Typography variant={"h3"}>Hotel Business Plan</Typography>

            {data.map(item =>
                <article key={item.id} id={item.id}>
                    <Typography variant={"h5"}>{item.title}</Typography>
                    <p>{item.description}</p>

                    {item.subHeaders.length !== 0 && item.subHeaders.map(sub =>
                        <Accordion key={sub.id}>
                            <AccordionSummary
                                expandIcon={<i className="fas fa-sort-down"></i>}
                                aria-controls="panel1a-content"
                                id={sub.id}
                            >
                                <Typography>{sub.tittle}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {sub.img && <div><img src={sub.img} /></div>}
                                <Typography>{sub.description}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </article >
            )
            }

        </div >
    )
}

export default BP
