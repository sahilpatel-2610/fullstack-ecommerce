import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from "../../../Components/ProductItem";
import Button from '@mui/material/Button';
import { IoIosArrowRoundForward } from "react-icons/io";


const RelatedProducts = (props) => {
    return (
        <>
            {/* -------- HEADING -------- */}
            <div className="d-flex align-items-center mb-3 mt-3">
                <div>
                  <h3 className="mb-0 hd">{props.title}</h3>
                </div>
            </div>

            {/* -------- PRODUCT SLIDER -------- */}
            <div className="product_row w-100 mt-0 ml-2">
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                navigation={true}
                slidesPerGroup={3}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><ProductItem /></SwiperSlide>
                <SwiperSlide><ProductItem /></SwiperSlide>
                <SwiperSlide><ProductItem /></SwiperSlide>
                <SwiperSlide><ProductItem /></SwiperSlide>
                <SwiperSlide><ProductItem /></SwiperSlide>
                <SwiperSlide><ProductItem /></SwiperSlide>
            </Swiper>
            </div>
        </>
    )
}

export default RelatedProducts;

