import React from 'react';
import Logo from '../../assets/images/logo.jpg';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CountryDropdown from '../CountryDropdown';
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { MyContext } from '../../App';
import { useContext } from 'react';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";

const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const context = useContext(MyContext);

    return (
        <>
            <div className="headerWrapper">
                <div className="top-strip bg-blue">
                    <div className="container">
                        <p className="mb-0 mt-0 text-center">Due to the <b>COVID 19</b> epidemic, orders may be processed with a slight delay</p>
                    </div>
                </div>

                <header className="header">
                    <div className="container">
                        <div className="row">
                            <div className="logoWrapper d-flex align-items-center col-sm-2">
                                <Link to={'/'}><img src={Logo} alt='Logo' /></Link>
                            </div>

                            <div className='col-sm-10 d-flex align-items-center part2'>
                                {
                                    context.countryList.length !== 0 && <CountryDropdown />
                                }
                                <SearchBox />

                                <div className='part3 d-flex align-items-center ml-auto'>
                                    {
                                        context.isLogin !== true ? <Link to="/signIn"><Button className="btn-blue btn-round mr-3">Sign In</Button></Link> :
                                            <>
                                                <Button className='circle mr-3' onClick={handleClick}><FiUser /></Button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    id="accDrop"
                                                    open={open}
                                                    onClose={handleClose}
                                                    onClick={handleClose}

                                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                >
                                                    <MenuItem onClick={handleClose}>
                                                        <ListItemIcon>
                                                            <FaUser fontSize="small" />
                                                        </ListItemIcon>
                                                        My Account
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClose}>
                                                        <ListItemIcon>
                                                            <FaClipboardCheck fontSize="small" />
                                                        </ListItemIcon>
                                                        Orders
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClose}>
                                                        <ListItemIcon>
                                                            <FaHeart fontSize="small" />
                                                        </ListItemIcon>
                                                        My List
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClose}>
                                                        <ListItemIcon>
                                                            <RiLogoutCircleRFill fontSize="small" />
                                                        </ListItemIcon>
                                                        Logout
                                                    </MenuItem>
                                                </Menu>
                                            </>

                                    }

                                    <div className='ml-auto cartTab d-flex align-items-center'>
                                        <span className='price'>$3.29</span>
                                        <div className='position-relative ml-2'>
                                            <Button className='circle'><IoBagOutline /></Button>
                                            <span className='count d-flex align-items-center justify-content-center'>1</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </header>


                {
                    context.subCategoryData?.length > 0 && <Navigation navData={context.subCategoryData} />
                }


            </div>
        </>
    )
}

export default Header;