import React, {useState, useEffect} from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import moment from "moment";


const Charts = () => {
    const [hasError, setErrors] = useState(false);
    const [domLoad, setDomLoad] = useState([]);
    const [windowLoad, setWindowLoad] = useState([]);
    const [ttfb, setTtfb] = useState([]);
    const [fcp, setFcp] = useState([]);

    async function fetchAnalytics() {
        const res = await fetch("http://localhost:3000/analytics");
        res
            .json()
            .then(res => {
                let domLoadList = [];
                let windowLoadList = [];
                let ttfbList = [];
                let fcpList = [];
                res.data.forEach(metric => {
                    console.log(metric);
                    domLoadList.push({date: moment(metric.created_at).format('LTS'), ms: metric.dom_load});
                    windowLoadList.push({date: moment(metric.created_at).format('LTS'), ms: metric.window_load_events});
                    ttfbList.push({date: moment(metric.created_at).format('LTS'), ms: metric.ttfb});
                    fcpList.push({date: moment(metric.created_at).format('LTS'), ms: metric.fcp});
                });
                setDomLoad(domLoadList);
                setWindowLoad(windowLoadList);
                setTtfb(ttfbList);
                setFcp(fcpList);

            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchAnalytics();
    }, []);

    return (
        <div>
            <hr/>
            <span>Has error: {JSON.stringify(hasError)}</span>

            <Grid container spacing={3}>
                <Grid item md={12}>
                    <Typography variant="h3" gutterBottom>
                        Performance Monitor
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" gutterBottom>
                        DOM Load (Avg)
                    </Typography>
                    <LineChart width={400} height={300} data={domLoad} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                        <Line type="monotone" dataKey="ms" stroke="#8884d8"/>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                    </LineChart>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" gutterBottom>
                        Window Load Events (Avg)
                    </Typography>
                    <LineChart width={400} height={300} data={windowLoad}
                               margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                        <Line type="monotone" dataKey="ms" stroke="#8884d8"/>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                    </LineChart>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" gutterBottom>
                        TTFB (Avg)
                    </Typography>
                    <LineChart width={400} height={300} data={ttfb} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                        <Line type="monotone" dataKey="ms" stroke="#8884d8"/>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                    </LineChart>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" gutterBottom>
                        FCP (Avg)
                    </Typography>
                    <LineChart width={400} height={300} data={fcp} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                        <Line type="monotone" dataKey="ms" stroke="#8884d8"/>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                    </LineChart>
                </Grid>
            </Grid>
        </div>
    );
};
export default Charts;
