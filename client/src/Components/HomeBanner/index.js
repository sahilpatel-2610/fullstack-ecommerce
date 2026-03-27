import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeBanner = () => {
  return (
    <div className="container-fluid mt-1">
      <div className="homeBannerSection">
        <Swiper
          slidesPerView={1.15}
          spaceBetween={20}
          navigation={true}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          className="home_banner_Swiper"
        >
          <SwiperSlide>
            <div className="item">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/896/328/image/c3336cf30f31dd74.jpg"
                className="w-100"
                alt="Banner 1"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/3240/1580/image/c4231c2fd445bee9.jpg"
                className="w-100"
                alt="Banner 2"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/3240/1580/image/40c1f1d377852711.jpg"
                className="w-100"
                alt="Banner 3"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/3240/1580/image/acb6e95035d3cef4.jpg"
                className="w-100"
                alt="Banner 4"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/3240/1580/image/304757a221f5d965.jpg"
                className="w-100"
                alt="Banner 5"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/3240/1580/image/c83fba569519c8e5.jpg"
                className="w-100"
                alt="Banner 6"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;