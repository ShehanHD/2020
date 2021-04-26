import './covidApp.scss';
import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core';
import DataGrid, { Column, LoadPanel, Scrolling, SearchPanel } from 'devextreme-react/data-grid';


function Covid(props) {
    const [data, setData] = useState([]);
    const [global, setGlobal] = useState([]);
    const [date, setDate] = useState("");

    useEffect(() => {
        props.traceUser(window.location.pathname);
    }, [])

    useEffect(() => {
        fetch('https://api.covid19api.com/summary',
            {
                headers: {
                    'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864'
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setGlobal(data.Global);
                setData(data.Countries);
                setDate(data.Date);
            })
    }, [])

    const rowPrepare = (row) => {
        if (row.data !== undefined && row.data !== undefined) {
            if (row.data.NewDeaths !== 0) {
                row.rowElement.cells[4].classList.add("red");
            } else {
                row.rowElement.cells[4].innerHTML = "-";
            }
        }
    }

    return (
        <>
            <Typography variant={'h4'} align={'center'}>Covid-19 Cases</Typography>
            <Typography variant={'h6'} align={'center'}><i>{new Date(date).toDateString()} {new Date(date).getUTCHours()}:{new Date(date).getUTCMinutes()}</i></Typography>


            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <div className={'info'}>
                        <Typography variant={'h6'}>Total Cases: {parseInt(global.TotalConfirmed).toLocaleString()}</Typography>
                        <Typography variant={'h6'}>New Cases: {parseInt(global.NewConfirmed).toLocaleString()}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className={'info'} style={{ color: '#cc2222' }}>
                        <Typography variant={'h6'}>Total Deaths: {parseInt(global.TotalDeaths).toLocaleString()}</Typography>
                        <Typography variant={'h6'}>New Deaths: {parseInt(global.NewDeaths).toLocaleString()}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className={'info'} style={{ color: '#22cc22' }}>
                        <Typography variant={'h6'}>Total Recovered: {parseInt(global.TotalRecovered).toLocaleString()}</Typography>
                        <Typography variant={'h6'}>New Recovered: {parseInt(global.NewRecovered).toLocaleString()}</Typography>
                    </div>
                </Grid>
            </Grid>


            <DataGrid component={Paper}
                dataSource={data || []}
                showBorders
                showRowLines
                columnAutoWidth
                onRowPrepared={rowPrepare}
                className={'covid-table'}
            >

                <SearchPanel visible={true} width={220} placeholder="Search..." />

                <Scrolling mode="infinite" />

                <LoadPanel enabled={false} />

                <Column dataField="Country" />
                <Column dataField="TotalConfirmed" defaultSortOrder={'desc'} />
                <Column dataField="NewConfirmed" />
                <Column dataField="TotalDeaths" />
                <Column dataField="NewDeaths" />
                <Column dataField="NewRecovered" />
                <Column dataField="TotalRecovered" />
            </DataGrid>
        </>
    )
}

export default Covid
