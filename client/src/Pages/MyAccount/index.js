import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { useState } from "react";


import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const MyAccount = () => {

    const [isLoading, setIsLoading] = useState(false);

    const history = useNavigate();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        window.scrollTo(0, 0);

        const token = localStorage.getItem("token");
        if (token !== "" && token !== undefined && token !== null) {
            setIsLoading(true);
        }
        else {
            history("/")
        }
    })

    return (
        <section className="section myAccountPage">
            <div className="container">
                <h2 className="hd">My Account</h2>

                <Box sx={{ width: '100%' }} className="myAccBox">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Edit Profile" {...a11yProps(0)} />
                            <Tab label="Change Password" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        Item One
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                </Box>

            </div>
        </section>
    )
}

export default MyAccount;