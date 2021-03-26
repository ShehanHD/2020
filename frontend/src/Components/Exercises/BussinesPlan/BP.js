import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { data } from './data'
import './BP.scss';

function BP() {
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
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<i className="fas fa-sort-down"></i>}
                                aria-controls="panel1a-content"
                                id={sub.id}
                                key={sub.id}
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
