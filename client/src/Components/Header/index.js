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
import { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";

const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const context = useContext(MyContext);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token !== "undefined") {
            context.setisLogin(true);
        }
    }, []);

    const logout = () => {
        setAnchorEl(null);
        localStorage.clear();
        context.setisLogin(false);
    }

    return (
        <>
            <div className="headerWrapper">
                {/* <div className="top-strip bg-blue">
                    <div className="container">
                        <p className="mb-0 mt-0 text-center">Due to the <b>COVID 19</b> epidemic, orders may be processed with a slight delay</p>
                    </div>
                </div> */}

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
                                    <a href={window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://fullstack-admin-panel-chi.vercel.app'} target="_blank" rel="noopener noreferrer">
                                        <Button className="btn-blue mr-3">Admin Panel</Button>
                                    </a>
                                    {
                                        (context.isLogin !== true && localStorage.getItem("token") === null) ? <Link to="/signIn"><Button className="btn-blue mr-3">Sign In</Button></Link> :
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
                                                    <Link to="/my-account">
                                                        <MenuItem onClick={handleClose}>
                                                            <ListItemIcon>
                                                                <FaUserAlt fontSize="small" />
                                                            </ListItemIcon>
                                                            My Account
                                                        </MenuItem>
                                                    </Link>
                                                    <Link to="/orders">
                                                        <MenuItem onClick={handleClose}>
                                                            <ListItemIcon>
                                                                <FaClipboardCheck fontSize="small" />
                                                            </ListItemIcon>
                                                            Orders
                                                        </MenuItem>
                                                    </Link>
                                                    <Link to="/my-list">
                                                        <MenuItem onClick={handleClose}>
                                                            <ListItemIcon>
                                                                <FaHeart fontSize="small" />
                                                            </ListItemIcon>
                                                            My List
                                                        </MenuItem>
                                                    </Link>
                                                    <MenuItem onClick={logout}>
                                                        <ListItemIcon>
                                                            <RiLogoutCircleRFill fontSize="small" />
                                                        </ListItemIcon>
                                                        Logout
                                                    </MenuItem>
                                                </Menu>
                                            </>

                                    }

                                    <Link to="/my-list">
                                        <div className='mr-3 cartTab d-flex align-items-center'>
                                            <div className='position-relative'>
                                                <Button className='circle'><FaHeart style={{ fontSize: '18px' }} /></Button>
                                                <span className='count d-flex align-items-center justify-content-center'>
                                                    {context.isLogin ? context.myListData?.length || 0 : 0}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/cart">
                                        <div className='ml-auto cartTab d-flex align-items-center'>

                                            {
                                                context.isLogin && context.cartData?.length !== 0 ?
                                                    <span className='price'>
                                                        ₹ {
                                                            context.cartData?.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0)
                                                        }
                                                    </span>
                                                    :
                                                    <span className='price'>
                                                        ₹ 0
                                                    </span>
                                            }

                                            <div className='position-relative ml-2'>
                                                <Button className='circle'><IoBagOutline /></Button>
                                                <span className='count d-flex align-items-center justify-content-center'>
                                                    {context.isLogin ? context.cartData?.length || 0 : 0}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </header>


                {
                    context.categoryData?.length > 0 && <Navigation navData={context.categoryData} />
                }


            </div>
        </>
    )
}

export default Header;