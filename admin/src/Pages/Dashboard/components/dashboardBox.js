
import { HiDotsVertical } from "react-icons/hi";
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { IoIosTimer } from "react-icons/io";


import { useNavigate } from "react-router-dom";

const DashboardBox = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="dashboardBox"
            onClick={() => props.path && navigate(props.path)}
            style={{
                backgroundImage:
                    `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`,
                cursor: props.path ? 'pointer' : 'default'
            }}>


            {
                props.grow === true ?

                    <span className="chart"><TrendingUpIcon /></span>

                    :

                    <span className="chart"><TrendingDownIcon /></span>

            }

            <div className="d-flex w-100 align-items-center">
                <div className="col1 flex-grow-1">
                    <h4 className="text-white mb-0">{props.title ? props.title : "Total Users"}</h4>
                    <span className="text-white">{props.count !== undefined ? props.count : 0}</span>
                </div>

                <div className="ms-auto d-flex flex-column align-items-center">
                    {
                        props.icon ?
                            <span className="icon">
                                {props.icon ? props.icon : ''}
                            </span>

                            :

                            ''
                    }

                    <div className="ml-auto toggleIconWrapper">
                        <Button className="ml-auto toggleIcon" onClick={(e) => {
                            e.stopPropagation();
                            handleClick(e);
                        }}><HiDotsVertical /></Button>

                        <Menu
                            className="dropdown_menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={(e) => e.stopPropagation()}
                            slotProps={{
                                paper: {
                                    style: {
                                        maxHeight: 200,
                                        width: '20ch',
                                    },
                                },

                            }}
                        >

                            <MenuItem onClick={() => { handleClose(); props.setPeriod !== undefined && props.setPeriod("lastDay") }}>
                                <IoIosTimer /> Last Day
                            </MenuItem>
                            <MenuItem onClick={() => { handleClose(); props.setPeriod !== undefined && props.setPeriod("lastWeek") }}>
                                <IoIosTimer /> Last Week
                            </MenuItem>
                            <MenuItem onClick={() => { handleClose(); props.setPeriod !== undefined && props.setPeriod("lastMonth") }}>
                                <IoIosTimer /> Last Month
                            </MenuItem>
                            <MenuItem onClick={() => { handleClose(); props.setPeriod !== undefined && props.setPeriod("lastYear") }}>
                                <IoIosTimer /> Last Year
                            </MenuItem>
                        </Menu>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default DashboardBox;


