// import React from "react";
// import Slider from "react-slick";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";



// const HomeBanner = () => {
//     var settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: true,
//         autoplay: true,

//     };
//     return (
//         <div className="container mt-3">
//             <div className="HomeBannerSection">
//                 <Swiper
//                     slidePerView={1}
//                     spaceBetween={15}
//                     navigation={true}
//                     loop={true}
//                     autoplay={{
//                         delay: 2500,
//                         disableOnInteraction: false
//                     }}
//                     modules={[Navigation, Autoplay]}
//                     className="mySwiper"
//                 >
//                 <SwiperSlide {...settings}>
//                    <div className="item">
//                        <img src="https://github.com/rinkuv37/fullstack-ecommerce/blob/main/images/slideBanner1.jpg?raw=true" className="w-100" />
//                     </div>
//                     <div className="item">
//                         <img src="https://github.com/rinkuv37/fullstack-ecommerce/blob/main/images/slideBanner2.jpg?raw=true" className="w-100" />
//                     </div>

//                 </SwiperSlide>
//                 </Swiper>
//             </div>
//         </div>
//     )
// };

// export default HomeBanner;


import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper styles import karva na bhulsho
import "swiper/css";
import "swiper/css/navigation";

const HomeBanner = () => {
  return (
    <div className="container mt-3">
      <div className="HomeBannerSection">
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
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


// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, Pagination } from "swiper/modules";

// // Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const HomeBanner = () => {
//   return (
//     <div className="HomeBannerSection">
//       <Swiper
//         slidesPerView={1}
//         spaceBetween={0}
//         navigation={true}
//         pagination={{ clickable: true }}
//         loop={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         modules={[Navigation, Autoplay, Pagination]}
//         className="mySwiper"
//       >
//         <SwiperSlide>
//           <img
//             src="https://api.spicezgold.com/download/file_1734525002307_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg"
//             alt="Banner 1"
//           />
//         </SwiperSlide>

//         <SwiperSlide>
//           <img
//             src="https://api.spicezgold.com/download/file_1734525014348_NewProject(7).jpg"
//             alt="Banner 2"
//           />
//         </SwiperSlide>

//         <SwiperSlide>
//           <img
//             src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg"
//             alt="Banner 3"
//           />
//         </SwiperSlide>

//         <SwiperSlide>
//           <img
//             src="https://api.spicezgold.com/download/file_1734524930884_NewProject(6).jpg"
//             alt="Banner 4"
//           />
//         </SwiperSlide>

//         <SwiperSlide>
//           <img
//             src="https://api.spicezgold.com/download/file_1734524971122_NewProject(8).jpg"
//             alt="Banner 5"
//           />
//         </SwiperSlide>

//         <SwiperSlide>
//           <img
//             src="https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg"
//             alt="Banner 6"
//           />
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// };

// export default HomeBanner;





// import React from "react";
// import Slider from "react-slick";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// // import "./HomeBanner.css";

// // Prev Arrow
// function PrevArrow({ className, style, onClick }) {
//   return (
//     <div
//       className={className + " custom-arrow prev"}
//       style={{ ...style }}
//       onClick={onClick}
//     >
//       <IoIosArrowBack />
//     </div>
//   );
// }

// // Next Arrow
// function NextArrow({ className, style, onClick }) {
//   return (
//     <div
//       className={className + " custom-arrow next"}
//       style={{ ...style }}
//       onClick={onClick}
//     >
//       <IoIosArrowForward />
//     </div>
//   );
// }

// const HomeBanner = () => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };

//   return (
//     <div className="homeBannerSection">
//       <Slider {...settings}>
//         <div className="item">
//           <img
//             src="https://github.com/rinkuv37/fullstack-ecommerce/blob/main/images/slideBanner1.jpg?raw=true"
//             className="w-100"
//             alt="Banner1"
//           />
//         </div>
//         <div className="item">
//           <img
//             src="https://github.com/rinkuv37/fullstack-ecommerce/blob/main/images/slideBanner2.jpg?raw=true"
//             className="w-100"
//             alt="Banner2"
//           />
//         </div>
//       </Slider>
//     </div>
//   );
// };

// export default HomeBanner;




// import React from "react";
// import Slider from "react-slick";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import "./HomeBanner.css";

// const NextArrow = ({ className, style, onClick }) => {
//   return (
//     <div
//       className={`${className} custom-arrow next`}
//       style={{ ...style }}
//       onClick={onClick}
//     >
//       <IoIosArrowForward size={30} />
//     </div>
//   );
// };

// const PrevArrow = ({ className, style, onClick }) => {
//   return (
//     <div
//       className={`${className} custom-arrow prev`}
//       style={{ ...style }}
//       onClick={onClick}
//     >
//       <IoIosArrowBack size={30} />
//     </div>
//   );
// };

// const HomeBanner = () => {
//   var settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };

//   return (
//     <div className="HomeBannerSection">
//       <Slider {...settings}>
//         <div className="item">
//           <img
//             src="https://sslimages.shoppersstop.com/sys-master/root/h98/h92/32015952117790/web_3093.jpg"
//             className="w-100"
//             alt="banner1"
//           />
//         </div>
//         <div className="item">
//           <img
//             src="https://sslimages.shoppersstop.com/sys-master/root/h98/h92/32004480991262/And-Forever-New-web_901.jpg"
//             className="w-100"
//             alt="banner2"
//           />
//         </div>
//         <div className="item">
//           <img
//             src="https://sslimages.shoppersstop.com/sys-master/root/hdd/h44/32004481122334/titan%2C-casio-web_31.jpg"
//             className="w-100"
//             alt="banner3"
//           />
//         </div>
//       </Slider>
//     </div>
//   );
// };

// export default HomeBanner;