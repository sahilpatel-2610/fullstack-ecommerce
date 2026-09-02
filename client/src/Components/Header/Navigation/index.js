import React, { useContext, useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../../App';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Navigation = (props) => {
    const [isOpenSidebarVal, setIsOpenSidebarVal] = useState(false);
    const [subCatModalCat, setSubCatModalCat] = useState(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const navRef = useRef(null);
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const handleScroll = () => {
        if (navRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
            setShowLeftArrow(scrollLeft > 5);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    useEffect(() => {
        const navEl = navRef.current;
        if (navEl) {
            handleScroll();
            navEl.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleScroll);
            return () => {
                navEl.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleScroll);
            };
        }
    }, [props.navData]);

    const scrollNav = (direction) => {
        if (navRef.current) {
            const scrollAmount = direction === 'left' ? -220 : 220;
            navRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleCategoryClick = (e, item) => {
        if (item.children?.length > 0) {
            e.preventDefault();
            setSubCatModalCat(item);
        } else {
            handleCatSelect(item);
        }
    };

    const handleSubCatSelect = (subItem) => {
        setSubCatModalCat(null);
        setIsOpenSidebarVal(false);
        const targetId = subItem?._id || subItem?.id || encodeURIComponent(subItem?.name || '');
        navigate(`/products/subCat/${targetId}`);
    };

    const handleCatSelect = (catItem) => {
        setSubCatModalCat(null);
        setIsOpenSidebarVal(false);
        const targetId = catItem?._id || catItem?.id || encodeURIComponent(catItem?.name || '');
        navigate(`/products/category/${targetId}`);
    };

    return (
        <nav>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-sm-3 col-md-2 navpart1'>
                        <div className='catWrapper'>
                            <Button className='allCatTab align-items-center' onClick={() => setIsOpenSidebarVal(!isOpenSidebarVal)}>
                                <span className='icon1 mr-2'><IoIosMenu /></span>
                                <span className='text'>ALL CATEGORIES</span>
                                <span className='icon2 ml-2'><FaAngleDown /></span>
                            </Button>

                            <div className={`sidebarNav ${isOpenSidebarVal === true ? 'open' : ''} shadow`}>
                                <ul>
                                    {
                                        context.categoryData?.length > 0 && context.categoryData?.map((item, index) => {
                                            return (
                                                <li key={item._id || index}>
                                                    <Button onClick={() => handleCatSelect(item)}>
                                                        {
                                                            item?.images?.length > 0 &&
                                                            <img src={Array.isArray(item.images) ? item.images[0] : item.images} className='catIcon' alt={item.name} style={{ width: '25px', height: '25px', objectFit: 'cover', borderRadius: '4px' }} />
                                                        }
                                                        {item.name} <FaAngleRight className='ml-auto' />
                                                    </Button>
                                                    <div className='submenu'>
                                                        {
                                                            item.children?.length > 0 && item.children?.map((subItem, subIndex) => {
                                                                return (
                                                                    <Button key={subItem._id || subIndex} className="w-100 text-left" onClick={() => handleSubCatSelect(subItem)}>
                                                                        {subItem.name}
                                                                    </Button>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-9 col-md-10 navpart2 d-flex align-items-center position-relative'>
                        {
                            showLeftArrow && (
                                <Button className='navScrollBtn leftNavBtn mr-1' onClick={() => scrollNav('left')} title="Scroll Left">
                                    <FaAngleLeft />
                                </Button>
                            )
                        }

                        <div className='navScrollWrapper w-100' ref={navRef}>
                            <ul className='list list-inline mb-0'>
                                {
                                    props.navData?.length > 0 && props.navData?.map((item, index) => {
                                        return (
                                            <li
                                                className='list-inline-item'
                                                key={item._id || index}
                                                onMouseEnter={() => item.children?.length > 0 && setSubCatModalCat(item)}
                                            >
                                                <Button
                                                    className={subCatModalCat?._id === item?._id ? 'active' : ''}
                                                    onClick={(e) => handleCategoryClick(e, item)}
                                                >
                                                    {
                                                        item?.images?.length > 0 &&
                                                        <img src={Array.isArray(item.images) ? item.images[0] : item.images} className='catIcon' alt={item?.name} style={{ width: '22px', height: '22px', objectFit: 'cover', borderRadius: '50%' }} />
                                                    }
                                                    <span className='catName'>{item?.name}</span>
                                                    {
                                                        item.children?.length > 0 && <FaAngleDown className='ml-1' style={{ fontSize: '10px', opacity: 0.7 }} />
                                                    }
                                                </Button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        {
                            showRightArrow && (
                                <Button className='navScrollBtn rightNavBtn ml-1' onClick={() => scrollNav('right')} title="Scroll Right">
                                    <FaAngleRight />
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* Compact Centered Subcategory Modal Popup (Exact match to Your Location modal) */}
            <Dialog
                open={Boolean(subCatModalCat)}
                onClose={() => setSubCatModalCat(null)}
                className='locationModal subCategoryModal'
                TransitionComponent={Transition}
            >
                <div className='d-flex align-items-center mb-1'>
                    {
                        subCatModalCat?.images?.length > 0 &&
                        <img
                            src={Array.isArray(subCatModalCat.images) ? subCatModalCat.images[0] : subCatModalCat.images}
                            className='subCatModalIcon mr-2'
                            alt={subCatModalCat.name}
                        />
                    }
                    <h4 className='mb-0'>{subCatModalCat?.name} Subcategories</h4>
                </div>
                <p>Select a subcategory in {subCatModalCat?.name} to explore products.</p>
                <Button className='close_' onClick={() => setSubCatModalCat(null)}><MdClose /></Button>

                <ul className='countryList mt-3'>
                    <li className="mb-2">
                        <Button
                            className="w-100 text-left font-weight-bold d-flex align-items-center justify-content-between text-primary"
                            onClick={() => handleCatSelect(subCatModalCat)}
                        >
                            <span>All {subCatModalCat?.name} Products</span>
                            <FaAngleRight />
                        </Button>
                    </li>
                    {
                        subCatModalCat?.children?.length > 0 && subCatModalCat.children.map((subItem, idx) => (
                            <li key={subItem._id || idx}>
                                <Button
                                    className="w-100 text-left d-flex align-items-center justify-content-between"
                                    onClick={() => handleSubCatSelect(subItem)}
                                >
                                    <span>{subItem.name}</span>
                                    <FaAngleRight />
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </Dialog>
        </nav>
    )
}

export default Navigation;