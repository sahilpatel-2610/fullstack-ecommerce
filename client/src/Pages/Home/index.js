import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import Button from '@mui/material/Button';
import { IoIosArrowRoundForward } from "react-icons/io";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";

import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import newsLetterImg from "../../assets/images/coupon.png";
import { IoMailOutline } from "react-icons/io5";
import { fetchDataFromApi } from "../../utils/api";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



import NewsLetter from "../../Components/NewsLetter";

const Home = () => {

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedCat, setSelectedCat] = useState();
  const [filterData, setFilterData] = useState([]);
  const [homeSlides, setHomeSlides] = useState([]);
  const [homeSideBanners, setHomeSideBanners] = useState([]);
  const [homeBottomBanners, setHomeBottomBanners] = useState([]);

  const context = useContext(MyContext);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (context.categoryData?.length > 0) {
      setSelectedCat(context.categoryData?.[newValue]?.name);
    }
  };

  const formatImageUrl = (img, fallback) => {
    if (!img) return fallback;
    let url = Array.isArray(img) ? img[0] : img;
    if (typeof url !== 'string') return fallback;
    if (url.startsWith('http://localhost:4000')) {
      const isLocal = window.location.hostname === 'localhost';
      if (!isLocal) {
        url = url.replace('http://localhost:4000', 'https://fullstack-ecommerce-server-do5l.onrender.com');
      }
    }
    return url;
  };

  const resolveSmartLink = (item, index) => {
    if (item?._id) return `/banner-products/${item._id}`;
    if (item?.subCatId && item?.subCatId !== "" && item?.subCatId !== "all") return `/products/subCat/${item.subCatId}`;
    if (item?.productId && item?.productId !== "" && item?.productId !== "all") return `/product/${item.productId}`;
    if (item?.catId && item?.catId !== "" && item?.catId !== "all") return `/products/category/${item.catId}`;
    if (item?.catName && item?.catName !== "" && item?.catName !== "all") return `/products/category/${encodeURIComponent(item.catName)}`;
    return `/banner-products/banner-side-${index || 0}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const locationQuery = context.selectedCountry && context.selectedCountry !== "All" ? `?location=${context.selectedCountry}` : '';
    const locationParam = context.selectedCountry && context.selectedCountry !== "All" ? `&location=${context.selectedCountry}` : '';

    fetchDataFromApi(`/api/products/featured${locationQuery}`).then((res) => {
      setFeaturedProducts(res);
    })

    fetchDataFromApi(`/api/products?perPage=8${locationParam}`).then((res) => {
      setProductsData(res);
    })

    fetchDataFromApi("/api/homeBanner").then((res) => {
      setHomeSlides(res?.bannerList);
    })

    fetchDataFromApi("/api/homeSideBanners").then((res) => {
      setHomeSideBanners(res?.bannerList || []);
    })

    fetchDataFromApi("/api/homeBottomBanners").then((res) => {
      setHomeBottomBanners(res?.bannerList || []);
    })

  }, [context.selectedCountry])

  useEffect(() => {
    if (context.categoryData?.length > 0) {
      setSelectedCat(context.categoryData[0]?.name);
    }
  }, [context.categoryData])

  useEffect(() => {
    if (selectedCat !== undefined) {
      const locationParam = context.selectedCountry && context.selectedCountry !== "All" ? `&location=${context.selectedCountry}` : '';
      fetchDataFromApi(`/api/products?catName=${selectedCat}${locationParam}`).then((res) => {
        setFilterData(res.products);
      })
    }
  }, [selectedCat, context.selectedCountry]);

  return (
    <>

      {
        homeSlides?.length > 0 && <HomeBanner data={homeSlides} />
      }

      {
        context.categoryData?.length > 0 && <HomeCat catData={context.categoryData} onSelect={(index) => handleChange(null, index)} activeIndex={value} />
      }


      <section className="homeProducts py-5">
        <div className="container">
          <div className="row">
            {/* -------- LEFT SIDE BANNERS -------- */}
            <div className="col-md-3">
              <div className="sticky">
                {
                  homeSideBanners?.length > 0 ? (
                    homeSideBanners.map((item, index) => {
                      const linkTo = resolveSmartLink(item, index);
                      const fallbackImg = index % 2 === 0 ? banner1 : banner2;
                      const imgUrl = formatImageUrl(item.images, fallbackImg);
                      return (
                        <div className="banner mb-4" key={item._id || index}>
                          <Link to={linkTo} state={{ banner: item, imgUrl }}>
                            <img
                              src={imgUrl}
                              className="w-100 cursor"
                              alt={`Side Banner ${index + 1}`}
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
                            />
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <div className="banner mb-4">
                        <Link to="/banner-products/side-banner-1" state={{ imgUrl: banner1 }}>
                          <img src={banner1} className="w-100 cursor" alt="Banner1" />
                        </Link>
                      </div>
                      <div className="banner">
                        <Link to="/banner-products/side-banner-2" state={{ imgUrl: banner2 }}>
                          <img src={banner2} className="w-100 cursor" alt="Banner2" />
                        </Link>
                      </div>
                    </>
                  )
                }
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
                key={selectedCat}
                slidesPerView={4}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >

                {
                  filterData?.length > 0 && filterData?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    )
                  })
                }

              </Swiper>

              <div className="bannerSec mt-4 mb-4">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={15}
                  navigation={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  loop={homeBottomBanners?.length > 3}
                  modules={[Navigation, Autoplay]}
                  className="mySwiper"
                >
                  {
                    homeBottomBanners?.length > 0 ? (
                      homeBottomBanners.map((item, index) => {
                        const linkTo = resolveSmartLink(item, index + 2);
                        const fallbackImg = index % 2 === 0 ? banner3 : banner4;
                        const imgUrl = formatImageUrl(item.images, fallbackImg);
                        return (
                          <SwiperSlide key={item._id || index}>
                            <div className="banner">
                              <Link to={linkTo} state={{ banner: item, imgUrl }}>
                                <img
                                  src={imgUrl}
                                  className="w-100 cursor"
                                  alt={`Bottom Banner ${index + 1}`}
                                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
                                />
                              </Link>
                            </div>
                          </SwiperSlide>
                        );
                      })
                    ) : (
                      <>
                        <SwiperSlide>
                          <div className="banner">
                            <Link to="/banner-products/bottom-banner-1" state={{ imgUrl: banner3 }}>
                              <img src={banner3} className="w-100 cursor" alt="Banner3" />
                            </Link>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide>
                          <div className="banner">
                            <Link to="/banner-products/bottom-banner-2" state={{ imgUrl: banner4 }}>
                              <img src={banner4} className="w-100 cursor" alt="Banner4" />
                            </Link>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide>
                          <div className="banner">
                            <Link to="/banner-products/bottom-banner-3" state={{ imgUrl: banner4 }}>
                              <img src={banner4} className="w-100 cursor" alt="Banner4" />
                            </Link>
                          </div>
                        </SwiperSlide>
                      </>
                    )
                  }
                </Swiper>
              </div>


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

              <div className="row mt-4 g-4">

                {
                  productsData?.products?.length > 0 && productsData?.products?.map((item, index) => {
                    return (
                      <div className="col-md-3 col-6 mb-4"><ProductItem key={index} item={item} /></div>
                    )
                  })
                }

              </div>

              {/* -------- HEADING -------- */}
              <div className="d-flex align-items-center mb-3 mt-4">
                <div>
                  <h3 className="mb-1 hd">FEATURED PRODUCTS</h3>
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
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >

                {
                  featuredProducts?.length > 0 && Array.isArray(featuredProducts) && featuredProducts?.map((item, index) => {
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
        </div>
      </section>

      <NewsLetter />



    </>
  );
};

export default Home;

