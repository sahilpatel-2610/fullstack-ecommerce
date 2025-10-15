// import HomeBanner from "../../Components/HomeBanner";
// import banner1 from "../../assets/images/banner1.jpg";
// import Button from '@mui/material/Button';
// import { IoIosArrowRoundForward } from "react-icons/io";
// import React from "react";
// import Slider from "react-slick";

// const Home = () => {

//   var productSliderOptions = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1
//   };
 

//   return (
//     <div>
//       <HomeBanner />

//       <section className="homeProducts">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-3">
//                <div className="banner">
//                 <img src={banner1} className="cursor" />
//               </div>
//             </div>
//             <div className="col-md-3">
              
//             </div>
            
//             <div className="col-md-9 productRow">
//               <div className="d-flex align-items-center">
//                 <div className="info w-75">
//                   <h3 className="mb-0 hd">BEST SELLERS</h3>
//                   <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
//                 </div>

//                 <Button className="viewAllBtn ml-auto">View All
//                 <IoIosArrowRoundForward /></Button>
//               </div>



//               <div className="product_row">
//                  <Slider {...productSliderOptions}>
//                   <div className="item productItem">
//                       <div className="imgWrapper">
//                         <img src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-3-346x310.jpg" className="w-100"/>
//                       </div>
//                   </div>
//                  </Slider>
//               </div>


//             </div>
              
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;




// import HomeBanner from "../../Components/HomeBanner";
// import banner1 from "../../assets/images/banner1.jpg";
// import Button from '@mui/material/Button';
// import { IoIosArrowRoundForward } from "react-icons/io";
// import React from "react";
// import Slider from "react-slick";

// const Home = () => {

//   var productSliderOptions = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1
//   };

//   return (
//     <div>
//       <HomeBanner />

//       <section className="homeProducts py-5">
//         <div className="container">
//           <div className="row">
            
//             {/* -------- LEFT SIDE BANNER -------- */}
//             <div className="col-md-3">
//               <div className="banner">
//                 <img src={banner1} className="w-100 cursor" alt="Banner" />
//               </div>
//             </div>

//             {/* -------- RIGHT SIDE PRODUCTS -------- */}
//             <div className="col-md-9">
              
//               {/* -------- TOP HEADING (BEST SELLERS + VIEW ALL) -------- */}
//               <div className="d-flex align-items-center mb-4">
//                 <div className="w-100 text-center">
//                   <h3 className="mb-1 hd">BEST SELLERS</h3>
//                   <p className="text-muted text-sml mb-0">
//                     Do not miss the current offers until the end of March.
//                   </p>
//                 </div>

//                 <div className="ml-auto">
//                   <Button className="viewAllBtn" variant="outlined">
//                     View All <IoIosArrowRoundForward />
//                   </Button>
//                 </div>
//               </div>

//               {/* -------- PRODUCT SLIDER -------- */}
//               <div className="product_row w-100">
//                 <Slider {...productSliderOptions}>
//                   <div className="item productItem">
//                     <div className="imgWrapper">
//                       <img
//                         src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-3-346x310.jpg"
//                         className="w-100"
//                         alt="product"
//                       />
//                     </div>
//                   </div>

//                   <div className="item productItem">
//                     <div className="imgWrapper">
//                       <img
//                         src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-2-346x310.jpg"
//                         className="w-100"
//                         alt="product"
//                       />
//                     </div>
//                   </div>
//                 </Slider>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;





// import HomeBanner from "../../Components/HomeBanner";
// import banner1 from "../../assets/images/banner1.jpg";
// import banner2 from "../../assets/images/banner2.jpg";
// import Button from '@mui/material/Button';
// import { IoIosArrowRoundForward } from "react-icons/io";
// import React from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import ProductItem from "../../Components/ProductItem";
// import HomeCat from "../../Components/HomeCat";

// const Home = () => {

//   var productSliderOptions = {
//     dots: true,
//     infinite: false,
//     speed: 500, 
//     slidesToShow: 4,
//     slidesToScroll: 1
//   };

//   return (
//     <div>
//       <HomeBanner />
//       <HomeCat />


//       <section className="homeProducts py-5">
//         <div className="container">
//           <div className="row">
            
//             {/* -------- LEFT SIDE BANNER -------- */}
//             <div className="col-md-3">
//               <div className="banner">
//                 <img src={banner1} className="w-100 cursor" alt="Banner" />
//               </div>

//               <div className="banner mt-4">
//                 <img src={banner2} className="w-100 cursor" alt="Banner" />
//               </div>
//             </div>

//             {/* -------- RIGHT SIDE PRODUCTS -------- */}
//             <div className="col-md-9">
              
//               {/* -------- HEADING ROW -------- */}
//               <div className="d-flex align-items-center mb-3">
//                 <div>
//                   <h3 className="mb-1 hd">BEST SELLERS</h3>
//                   <p className="text-muted text-sml mb-0">
//                     Do not miss the current offers until the end of March.
//                   </p>
//                 </div>

//                 <Button className="viewAllBtn ml-auto" variant="outlined">
//                   View All <IoIosArrowRoundForward />
//                 </Button>
//               </div>

//               {/* -------- PRODUCT SLIDER -------- */}
//               <div className="product_row w-100 mt-4">
//                 <Swiper
//                     slidesPerView={4}
//                     spaceBetween={0}
//                     pagination={{
//                       clickable: true,
//                     }}
//                     modules={[Navigation]}
//                     className="mySwiper"
//                 >
//                  <SwiperSlide>
//                     <ProductItem />
//                  </SwiperSlide>

//                   <SwiperSlide>
//                     <ProductItem />
//                   </SwiperSlide>

//                   <SwiperSlide>
//                     <ProductItem />
//                   </SwiperSlide>

//                   <SwiperSlide>
//                     <ProductItem />
//                   </SwiperSlide>

//                   <SwiperSlide>
//                     <ProductItem />
//                   </SwiperSlide>

//                   <SwiperSlide>
//                     <ProductItem />
//                   </SwiperSlide>

//                 </Swiper>
                
              
//                 <div className="d-flex align-items-center mt-5">
//                   <div>
//                     <h3 className="mb-1 hd">NEW PRODUCTS</h3>
//                     <p className="text-muted text-sml mb-0">
//                       New products with updated stocks.
//                     </p>
//                   </div>

//                   <Button className="viewAllBtn ml-auto" variant="outlined">
//                     View All <IoIosArrowRoundForward />
//                   </Button>
//                 </div>

//                 <div className="product_row productRow2 w-100 mt-4 d-flex">
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;





import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import Button from '@mui/material/Button';
import { IoIosArrowRoundForward } from "react-icons/io";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";

import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import newsLetterImg from "../../assets/images/coupon.png";
import { IoMailOutline } from "react-icons/io5";



const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeCat />

      <section className="homeProducts py-5">
        <div className="container">
          <div className="row">
            {/* -------- LEFT SIDE BANNERS -------- */}
            <div className="col-md-3">
              <div className="sticky">
                <div className="banner mb-4">
                  <img src={banner1} className="w-100 cursor" alt="Banner1" />
                </div>

                <div className="banner">
                  <img src={banner2} className="w-100 cursor" alt="Banner2" />
                </div>
              </div>
            </div>

            {/* -------- RIGHT SIDE PRODUCTS -------- */}
            <div className="col-md-9">
              {/* -------- HEADING -------- */}
              <div className="d-flex align-items-center mb-3">
                <div>
                  <h3 className="mb-1 hd">BEST SELLERS</h3>
                  <p className="text-muted text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
                <Button className="viewAllBtn ml-auto" variant="outlined">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>

              {/* -------- PRODUCT SLIDER -------- */}
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={true}
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

              {/* -------- NEW PRODUCTS -------- */}
              <div className="d-flex align-items-center mt-5">
                <div>
                  <h3 className="mb-1 hd">NEW PRODUCTS</h3>
                  <p className="text-muted text-sml mb-0">
                    New products with updated stocks.
                  </p>
                </div>
                <Button className="viewAllBtn ml-auto" variant="outlined">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="row mt-4">
                <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
                <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
                <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
                <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
                <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
                <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
                <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
                <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
              </div>


              <div className="d-flex gap-4 bannerSec">
                <div className="banner">
                  <img src={banner3} className="w-100 cursor" alt="Banner3" />
                </div>

                <div className="banner">
                  <img src={banner4} className="w-100 cursor" alt="Banner4" />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
                <p className="text-white mb-1">$20 discount for your first order</p>
                <h3 className="text-white">Join our newsletter and get...</h3>
                <p className="text-light">Join our email subscription now to get updates on<br /> promotions and coupons.</p>


               <form>
                  <IoMailOutline />
                  <input type="text" placeholder="Your Email Address"/>
                  <Button>Subscribe</Button>
               </form>

            </div>

            <div className="col-md-6">
              <img src={newsLetterImg} />
            </div>
          </div>
        </div>
      </section>

    

    </div>
  );
};

export default Home;