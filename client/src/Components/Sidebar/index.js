import React, { useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../../App';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Rating from '@mui/material/Rating';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchDataFromApi } from '../../utils/api';

const Sidebar = ({ filterByPrice, filterByRating, categoryId }) => {
    const [value, setValue] = useState([100, 500000]);

    const [subCatId, setSubCatId] = useState('');

    const [filterSubCat, setFilterSubCat] = React.useState();
    const [sidebarBanners, setSidebarBanners] = useState([]);

    const context = useContext(MyContext);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setSubCatId(id);
        setFilterSubCat(id);
    }, [id]);

    useEffect(() => {
        fetchDataFromApi('/api/sidebarBanners').then((res) => {
            if (res && res.bannerList && res.bannerList.length > 0) {
                setSidebarBanners(res.bannerList);
            }
        });
    }, []);


    const handleChange = (event) => {
        setFilterSubCat(event.target.value);
        setSubCatId(event.target.value);
        navigate(`/products/subCat/${event.target.value}`);
    };


    useEffect(() => {
        filterByPrice(value, subCatId);
    }, [value, subCatId, filterByPrice]);

    const handleFilterByRating = (rating) => {
        filterByRating(rating, subCatId);
    }

    return (
        <>
            <div className="sidebar">
                <div className="filterBox">
                    <h6>PRODUCT CATEGORIES</h6>

                    <div className='scroll'>

                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={filterSubCat}
                            onChange={handleChange}
                        >

                            {
                                context.subCategoryData?.length > 0 && context.subCategoryData
                                    ?.filter(item => categoryId ? item.parentId === categoryId : true)
                                    ?.map((item, index) => {
                                        return (
                                            <FormControlLabel value={item?._id} control={<Radio />} key={index} label={item?.name} />
                                        )
                                    })
                            }




                        </RadioGroup>

                        <ul>

                        </ul>
                    </div>
                </div>


                <div className="filterBox">
                    <h6>FILTER BY PRICE</h6>

                    <RangeSlider value={value} onInput={setValue} min={100} max={500000} step={5} />

                    <div className='d-flex pt-2 pb-2 priceRange'>
                        <span>From: <strong className='text-dark'>RS: {value[0]}</strong></span>
                        <span className='ml-auto'>From: <strong className='text-dark'>RS: {value[1]}</strong></span>
                    </div>

                </div>


                <div className="filterBox">
                    <h6>FILTER BY RATING</h6>

                    <div className='scroll pl-0'>

                        <ul>
                            <li onClick={() => handleFilterByRating(5)} style={{ cursor: 'pointer' }}>
                                <Rating name="read-only" value={5} readOnly size="small" />
                            </li>
                            <li onClick={() => handleFilterByRating(4)} style={{ cursor: 'pointer' }}>
                                <Rating name="read-only" value={4} readOnly size="small" />
                            </li>
                            <li onClick={() => handleFilterByRating(3)} style={{ cursor: 'pointer' }}>
                                <Rating name="read-only" value={3} readOnly size="small" />
                            </li>
                            <li onClick={() => handleFilterByRating(2)} style={{ cursor: 'pointer' }}>
                                <Rating name="read-only" value={2} readOnly size="small" />
                            </li>
                            <li onClick={() => handleFilterByRating(1)} style={{ cursor: 'pointer' }}>
                                <Rating name="read-only" value={1} readOnly size="small" />
                            </li>

                        </ul>




                    </div>
                </div>




                {
                    sidebarBanners?.length > 0 && (
                        <Link to={`/banner-products/${sidebarBanners[0]._id || 'sidebar-banner'}`} state={{ banner: sidebarBanners[0], imgUrl: Array.isArray(sidebarBanners[0].images) ? sidebarBanners[0].images[0] : sidebarBanners[0].images }}>
                            <img
                                src={Array.isArray(sidebarBanners[0].images) ? sidebarBanners[0].images[0] : sidebarBanners[0].images}
                                className="w-100"
                                alt="sidebar banner"
                            />
                        </Link>
                    )
                }

            </div>
        </>
    )
}

export default Sidebar;