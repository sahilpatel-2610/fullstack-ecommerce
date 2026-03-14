import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from "../../../Components/ProductItem";


const RelatedProducts = (props) => {
    return (
        <div className="relatedProducts mt-5 mb-5">
            {/* -------- HEADING -------- */}
            <div className="d-flex align-items-center mb-4">
                <h3 className="mb-0 hd">{props.title}</h3>
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
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        500: { slidesPerView: 2, spaceBetween: 15 },
                        768: { slidesPerView: 3, spaceBetween: 15 },
                        1024: { slidesPerView: 4, spaceBetween: 15 },
                        1200: { slidesPerView: 5, spaceBetween: 15 },
                    }}
                >
                    {
                        props?.data?.length > 0 && props?.data?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <ProductItem item={item} />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default RelatedProducts;

