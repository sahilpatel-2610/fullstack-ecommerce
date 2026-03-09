
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

// import banner3 from "../../assets/images/banner3.jpg";
// import banner4 from "../../assets/images/banner4.jpg";
// import newsLetterImg from "../../assets/images/coupon.png";
// import { IoMailOutline } from "react-icons/io5";
// import { fetchDataFromApi } from "../../utils/api";
// import { useState } from "react";
// import { useEffect } from "react";



// const Home = () => {

//   const [catData, setCatData] = useState([]);
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [productsData, setProductsData] = useState([]);

//   useEffect(() => {
//     fetchDataFromApi("/api/category/").then((res) => {
//       setCatData(res);
//     })

//     fetchDataFromApi(`/api/products/featured`).then((res) => {
//      setFeaturedProducts(res);
//     })

//     fetchDataFromApi("/api/products/").then((res) => {
//       setProductsData(res);
//     })

//   },[])

//   return (
//     <>
//       <HomeBanner />
//       {
//         catData?.length!==0 && <HomeCat catData={catData} />
//       }


//       <section className="homeProducts py-5">
//         <div className="container">
//           <div className="row">
//             {/* -------- LEFT SIDE BANNERS -------- */}
//             <div className="col-md-3">
//               <div className="sticky">
//                 <div className="banner mb-4">
//                   <img src={banner1} className="w-100 cursor" alt="Banner1" />
//                 </div>

//                 <div className="banner">
//                   <img src={banner2} className="w-100 cursor" alt="Banner2" />
//                 </div>
//               </div>
//             </div>

//             {/* -------- RIGHT SIDE PRODUCTS -------- */}
//             <div className="col-md-9">
//               {/* -------- HEADING -------- */}
//               <div className="d-flex align-items-center mb-3">
//                 <div>
//                   <h3 className="mb-1 hd">FEATURED PRODUCTS</h3>
//                   <p className="text-muted text-sml mb-0">
//                     Do not miss the current offers until the end of March.
//                   </p>
//                 </div>
//                 <Button className="viewAllBtn ml-auto" variant="outlined">
//                   View All <IoIosArrowRoundForward />
//                 </Button>
//               </div>

//               {/* -------- PRODUCT SLIDER -------- */}
//               <Swiper
//                 slidesPerView={4}
//                 spaceBetween={20}
//                 navigation={true}
//                 modules={[Navigation]}
//                 className="mySwiper"
//               >
//                 {
//                   featuredProducts?.featured?.length !== 0 && featuredProducts?.featured?.map((item, index) => {
//                     return (
//                       <SwiperSlide key={index}>
//                         <ProductItem item={item} />
//                       </SwiperSlide>
//                     )
//                   })
//                 }

//               </Swiper>

//               {/* -------- NEW PRODUCTS -------- */}
//               <div className="d-flex align-items-center mt-5">
//                 <div>
//                   <h3 className="mb-1 hd">NEW PRODUCTS</h3>
//                   <p className="text-muted text-sml mb-0">
//                     New products with updated stocks.
//                   </p>
//                 </div>
//                 <Button className="viewAllBtn ml-auto" variant="outlined">
//                   View All <IoIosArrowRoundForward />
//                 </Button>
//               </div>

//               <div className="product_row productRow2 w-100 mt-4 d-flex">

//                 {
//                   productsData?.products?.length !== 0 && productsData?.products?.map((item, index) => {
//                     return (
//                       <SwiperSlide key={index}>
//                         <ProductItem item={item} />
//                       </SwiperSlide>
//                     )
//                   })
//                 }



//                 <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
//                 <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
//                 <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
//                 <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
//                 <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
//                 <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
//                 <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
//                 <div className="col-md-3 col-6 mb-4"><ProductItem /></div>
//               </div>


//               <div className="d-flex gap-4 bannerSec">
//                 <div className="banner">
//                   <img src={banner3} className="w-100 cursor" alt="Banner3" />
//                 </div>

//                 <div className="banner">
//                   <img src={banner4} className="w-100 cursor" alt="Banner4" />
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-6">
//                 <p className="text-white mb-1">$20 discount for your first order</p>
//                 <h3 className="text-white">Join our newsletter and get...</h3>
//                 <p className="text-light">Join our email subscription now to get updates on<br /> promotions and coupons.</p>


//                <form>
//                   <IoMailOutline />
//                   <input type="text" placeholder="Your Email Address"/>
//                   <Button>Subscribe</Button>
//                </form>

//             </div>

//             <div className="col-md-6">
//               <img src={newsLetterImg} />
//             </div>
//           </div>
//         </div>
//       </section>



//     </>
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
import { fetchDataFromApi } from "../../utils/api";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../App";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



const Home = () => {

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedCat, setSelectedCat] = useState();
  const [filterData, setFilterData] = useState([]);

  const context = useContext(MyContext);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (context.categoryData?.length > 0) {
      setSelectedCat(context.categoryData[newValue].name);
    }
  };

  const selectCat = (cat) => {
    setSelectedCat(cat);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFromApi(`/api/products/featured`).then((res) => {
      setFeaturedProducts(res);
    })

    fetchDataFromApi("/api/products?perPage=8").then((res) => {
      setProductsData(res);
    })

  }, [])

  useEffect(() => {
    if (context.categoryData?.length > 0) {
      setSelectedCat(context.categoryData[0]?.name);
    }
  }, [context.categoryData])

  useEffect(() => {
    if (selectedCat !== undefined) {
      fetchDataFromApi(`/api/products?catName=${selectedCat}`).then((res) => {
        setFilterData(res.products);
      })
    }
  }, [selectedCat]);

  return (
    <>
      <HomeBanner />
      {
        context.categoryData?.length !== 0 && <HomeCat catData={context.categoryData} />
      }


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
                <div className="info">
                  <h3 className="mb-0 hd">Popular Products</h3>
                  <p className="text-muted text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>

                <div className="ml-auto filterTabWrapper">

                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    className="filterTabs"
                  >
                    {
                      context.categoryData?.map((item, index) => {
                        return (
                          <Tab key={index} className="item" label={item?.name} />
                        )
                      })
                    }

                  </Tabs>

                </div>

              </div>

              {/* -------- PRODUCT SLIDER -------- */}
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >

                {
                  filterData?.length !== 0 && filterData?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    )
                  })
                }
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

              <div className="row mt-4 w-100 d-flex">

                {
                  productsData?.products?.length !== 0 && productsData?.products?.map((item, index) => {
                    return (
                      <div className="col-md-3 col-6 mb-4"><ProductItem key={index} item={item} /></div>
                    )
                  })
                }

              </div>

              {/* -------- HEADING -------- */}
              <div className="d-flex align-items-center mb-3 mt-4">
                <div>
                  <h3 className="mb-1 hd">ELECTRONICS</h3>
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

                {
                  featuredProducts?.length !== 0 && Array.isArray(featuredProducts) && featuredProducts?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>


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
                <input type="text" placeholder="Your Email Address" />
                <Button>Subscribe</Button>
              </form>

            </div>

            <div className="col-md-6">
              <img src={newsLetterImg} />
            </div>
          </div>
        </div>
      </section>



    </>
  );
};

export default Home;

