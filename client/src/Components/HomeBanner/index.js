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
          slidesPerView={1}
          spaceBetween={10}
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
                src="https://api.spicezgold.com/download/file_1734525002307_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg"
                className="w-100"
                alt="Banner 1"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img
                src="https://api.spicezgold.com/download/file_1734525014348_NewProject(7).jpg"
                className="w-100"
                alt="Banner 2"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img
                src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg"
                className="w-100"
                alt="Banner 3"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img
                src="https://api.spicezgold.com/download/file_1734524930884_NewProject(6).jpg"
                className="w-100"
                alt="Banner 4"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img
                src="https://api.spicezgold.com/download/file_1734524971122_NewProject(8).jpg"
                className="w-100"
                alt="Banner 5"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img
                src="https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg"
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