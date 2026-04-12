
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
    const navigate = useNavigate();

    return (
        <Button className="dashboardBox"
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
                    <span className="text-white">{props.count ? props.count : "277"}</span>
                </div>

                {
                    props.icon ?
                        <span className="icon ms-auto">
                            {props.icon ? props.icon : ''}
                        </span>

                        :

                        ''
                }
            </div>

        </Button>
    )
}

export default DashboardBox;

