import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeBanner = (props) => {
  const context = useContext(MyContext);

  const getBannerLink = (item, index) => {
    if (item?._id) return `/banner-products/${item._id}`;
    if (item?.subCatId && item?.subCatId !== "" && item?.subCatId !== "all") return `/products/subCat/${item.subCatId}`;
    if (item?.productId && item?.productId !== "" && item?.productId !== "all") return `/product/${item.productId}`;
    if (item?.catId && item?.catId !== "" && item?.catId !== "all") return `/products/category/${item.catId}`;
    if (item?.catName && item?.catName !== "" && item?.catName !== "all") return `/products/category/${encodeURIComponent(item.catName)}`;
    return `/banner-products/home-banner-${index}`;
  };

  return (
    <div className="container-fluid px-0 mt-1">
      <div className="homeBannerSection">
        <Swiper
          slidesPerView={1.09}
          spaceBetween={12}
          navigation={true}
          loop={props?.data?.length > 1}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.05,
              spaceBetween: 6,
            },
            576: {
              slidesPerView: 1.06,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 1.08,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 1.09,
              spaceBetween: 12,
            }
          }}
          modules={[Navigation, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          className="home_banner_Swiper"
        >
          {
            props?.data?.length > 0 && props?.data?.map((item, index) => {
              const linkTo = getBannerLink(item, index);
              return (
                <SwiperSlide key={index}>
                  <Link to={linkTo} state={{ banner: item, imgUrl: Array.isArray(item.images) ? item.images[0] : item.images }}>
                    <div className="item">
                      <img
                        src={item?.images[0]}
                        className="w-100 cursor"
                        alt={`Banner ${index + 1}`}
                      />
                    </div>
                  </Link>
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