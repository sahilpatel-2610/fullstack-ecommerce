import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from "../../../Components/ProductItem";


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
            <div className="product_row w-100 mt-0">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={15}
                    navigation={true}
                    loop={false}
                    slidesPerGroup={1}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {
                        props?.data?.length !== 0 && props?.data?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <ProductItem item={item} />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </>
    )
}

export default RelatedProducts;

