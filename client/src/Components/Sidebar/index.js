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

const Sidebar = ({ filterByPrice, filterByRating, categoryId }) => {
    const [value, setValue] = useState([100, 500000]);

    const [subCatId, setSubCatId] = useState('');

    const [filterSubCat, setFilterSubCat] = React.useState();

    const context = useContext(MyContext);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setSubCatId(id);
        setFilterSubCat(id);
    }, [id])


    const handleChange = (event) => {
        setFilterSubCat(event.target.value);
        setSubCatId(event.target.value);
        navigate(`/subCat/${event.target.value}`);
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
                                    ?.filter(item => categoryId ? item.category?._id === categoryId : true)
                                    ?.map((item, index) => {
                                        return (
                                            <FormControlLabel value={item?._id} control={<Radio />} key={index} label={item?.subCat} />
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




                <Link to="#"><img src='https://klbtheme.com/bacola/wp-content/uploads/2021/05/sidebar-banner.gif' className='w-100' alt="sidebar banner" /></Link>

            </div>
        </>
    )
}

export default Sidebar;