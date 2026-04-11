import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeBanner = (props) => {
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
          {
            props?.data?.length > 0 && props?.data?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="item">
                    <img
                      src={item?.images[0]}
                      className="w-100"
                      alt="Banner 1"
                    />
                  </div>
                </SwiperSlide>
              );
            })
          }


        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;