import React from "react";
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import UserAvtarImgComponent from "../../components/userAvtarImg";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaReply } from "react-icons/fa";
import { useRef } from "react";

//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductDetails = () => {

    const productSliderBig = useRef();
    const productSliderSml = useRef();

    var productSliderOptions = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    var productSliderSmlOptions = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };


    const goToSlide = (index) => {
      productSliderBig.current.slickGoTo(index);
      productSliderBig.current.slickGoTo(index);
    }

    return (
        <>
             <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                  <h5 className="mb-0">Product View</h5>
                  <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                      <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                      />
                      <StyledBreadcrumb
                        label="Products"
                        href="#"
                        deleteIcon={<ExpandMoreIcon />}
                      />
                      <StyledBreadcrumb
                        label="Product View"
                        deleteIcon={<ExpandMoreIcon />}
                      />
                  </Breadcrumbs>
                </div>
    
{/* 


              <div className='card productDetailsSEction'>
                <div className='row'>
                  <div className='col-md-5'>
                      <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
                        <h6 className="mb-4">Product Gallery</h6>
                        <div className="prodcutZoom">
                          <div className="productZoom productZoomBig position-relative mb-3">
                            <div className="badge badge-primary">
                              "8"
                              "%"
                            </div>
                            <div class="swiper swiper-initialized swiper-horizontal zoomSliderBig swiper-backface-hidden">
                              <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms; transition-delay: 0ms;">
                                <div class="swiper-slide swiper-slide-active" style="width: 412px;">
                                  <div class="item">
                                    <figure class="iiz  ">
                                      <div>
                                        <img class="iiz__img   " src="https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-0-202211052110.webp" style="transition: opacity linear, visibility linear;" />
                                      </div>
                                      <span class="iiz__btn iiz__hint">
                                      </span>
                                    </figure>
                                  </div>
                                </div>
                                  <div class="swiper-slide swiper-slide-next" style="width: 412px;">
                                    <div class="item">
                                      <figure class="iiz  ">
                                        <div>
                                          <img class="iiz__img   " src="https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-1-202211052110.webp" style="transition: opacity linear, visibility linear;" />
                                        </div>
                                        <span class="iiz__btn iiz__hint">
                                          </span>
                                      </figure>
                                    </div>
                                  </div>
                                  <div class="swiper-slide" style="width: 412px;">
                                    <div class="item">
                                      <figure class="iiz  ">
                                        <div>
                                          <img class="iiz__img   " src="https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-2-202211052110.webp" style="transition: opacity linear, visibility linear;" />
                                        </div>
                                        <span class="iiz__btn iiz__hint">
                                          </span>
                                      </figure>
                                    </div>
                                  </div>
                                </div>
                                </div>
                          </div>
                        </div>

                      </div>

                  </div> */}
              <div className='card productDetailsSEction'>
                <div className='row'>
                  <div className='col-md-5'>
                      <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
                        <h6 className="mb-4">Product Gallery</h6>
                        <Slider {...productSliderOptions} ref={productSliderBig} className="sliderBig mb-2" >
                          <div className="item p-4">
                            <div className="product-main-image">
                              <img src="https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-0-202211052110.webp" className="w-100" />
                            </div>
                            {/* <div className="product-main-image">
                              <img src="https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-0-202211052110.webp" className="w-100" />
                            </div>
                            <div className="product-main-image">
                              <img src="https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-0-202211052110.webp" className="w-100" />
                            </div> */}
                          </div>
                        </Slider>

                        <Slider {...productSliderSmlOptions} ref={productSliderSml} className="sliderSml mt-3" >
                          <div className="item product-thumb p-4" onClick={() => goToSlide (1)}>
                            <img src="https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-0-202211052110.webp" className="w-100" />
                          </div>

                          <div className="item product-thumb p-4" onClick={() => goToSlide (2)}>
                            <img src="https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-1-202211052110.webp" className="w-100" />
                          </div>

                          <div className="item product-thumb p-4" onClick={() => goToSlide (3)}>
                            <img src="https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-2-202211052110.webp" className="w-100" />
                          </div>
                        </Slider>
                      </div>

                  </div>

                  <div className='col-md-7'>
                    <div className="pt-3 pb-3 pl-4 pr-4">
                      <h6 className="mb-4">Product Details</h6>

                      <h4>Formal suits for men wedding slim fit 3 price dress business party jacket</h4>


                      <div className="productInfo mt-4">
                        <div className="row mb-2">
                          <div className="col-sm-3 d-flex align-items-center">
                            <span className="icon"><MdBrandingWatermark /></span>
                            <span className="name">Brand</span>
                          </div>

                          <div className="col-sm-9">
                              <span>Ecstasy</span>
                          </div>
                        </div> 

                        <div className="row">
                          <div className="col-sm-3 d-flex align-items-center">
                            <span className="icon"><BiSolidCategoryAlt /></span>
                            <span className="name">Category</span>
                          </div>

                          <div className="col-sm-9">
                               <span>Man's</span>
                          </div>
                        </div> 

                         <div className="row">
                          <div className="col-sm-3 d-flex align-items-center">
                            <span className="icon"><BiSolidCategoryAlt /></span>
                            <span className="name">Tags</span>
                          </div>

                          <div className="col-sm-9">
                               <span>
                                <ul className="list list-inline tags sml">
                                  <li className="list-inline-item">
                                    <span>SUITE</span>
                                  </li>
                                  <li className="list-inline-item">
                                    <span>PARTY</span>
                                  </li>
                                   <li className="list-inline-item">
                                    <span>DRESS</span>
                                  </li>
                                   <li className="list-inline-item">
                                    <span>SMART</span>
                                  </li>
                                   <li className="list-inline-item">
                                    <span>MAN</span>
                                  </li>
                                   <li className="list-inline-item">
                                    <span>STYLES</span>
                                  </li>
                                </ul>
                              </span>
                          </div>
                        </div> 

                         <div className="row">
                          <div className="col-sm-3 d-flex align-items-center">
                            <span className="icon"><BiSolidCategoryAlt /></span>
                            <span className="name">Color</span>
                          </div>

                          <div className="col-sm-9">
                               <span>
                                <ul className="list list-inline tags sml">
                                  <li className="list-inline-item">
                                    <span>RED</span>
                                  </li>
                                  <li className="list-inline-item">
                                    <span>BLUE</span>
                                  </li>
                                   <li className="list-inline-item">
                                    <span>GREEN</span>
                                  </li>
                                   <li className="list-inline-item">
                                    <span>YELLOW</span>
                                  </li>
                                   <li className="list-inline-item">
                                    <span>PURPLE</span>
                                  </li>
                                </ul>
                              </span>
                          </div>
                        </div> 

                         <div className="row">
                          <div className="col-sm-3 d-flex align-items-center">
                            <span className="icon"><BiSolidCategoryAlt /></span>
                            <span className="name">Size</span>
                          </div>

                          <div className="col-sm-9">
                               <span>
                                <ul className="list list-inline tags sml">
                                  <li className="list-inline-item">
                                    <span>SM</span>
                                  </li>
                                  <li className="list-inline-item">
                                    <span>MD</span>
                                  </li>
                                   <li className="list-inline-item">
                                    <span>LG</span>
                                  </li>
                                   <li className="list-inline-item">
                                    <span>XL</span>
                                  </li>
                                   <li className="list-inline-item">
                                    <span>XXL</span>
                                  </li>
                                </ul>
                              </span>
                          </div>
                        </div> 

                         <div className="row">
                          <div className="col-sm-3 d-flex align-items-center">
                            <span className="icon"><BiSolidCategoryAlt /></span>
                            <span className="name">Price</span>
                          </div>

                          <div className="col-sm-9">
                               <span>$37.00</span>
                          </div>
                        </div> 

                         <div className="row">
                          <div className="col-sm-3 d-flex align-items-center">
                            <span className="icon"><BiSolidCategoryAlt /></span>
                            <span className="name">Stock</span>
                          </div>

                          <div className="col-sm-9">
                               <span>(68) Price</span>
                          </div>
                        </div> 

                         <div className="row">
                          <div className="col-sm-3 d-flex align-items-center">
                            <span className="icon"><BiSolidCategoryAlt /></span>
                            <span className="name">Review</span>
                          </div>

                          <div className="col-sm-9">
                               <span>(03) Review</span>
                          </div>
                        </div> 

                        <div className="row">
                          <div className="col-sm-3 d-flex align-items-center">
                            <span className="icon"><BiSolidCategoryAlt /></span>
                            <span className="name">Published</span>
                          </div>

                          <div className="col-sm-9">
                               <span>02 Feb 2020</span>
                          </div>
                        </div> 
                      </div>

                    </div> 
                    
                  </div>
                </div>




                <div className="p-4">
                  <h6 className="mt-4 mb-3">Product Description</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>


                    <br/>

                    <h6 className="mt-4 mb-4">Rating Analytics</h6>

                    <div className="ratingSection">
                      <div className="ratingrow d-flex align-items-center">
                        <span className="col1">
                          5 Star
                        </span>

                        <div className="col2">
                          <div className="progress">
                            <div className="progress-bar" style={{width: '70%'}}></div>
                          </div>
                        </div>

                        <span className="col3">
                          (22)
                        </span>
                      </div>

                      <div className="ratingrow d-flex align-items-center">
                        <span className="col1">
                          4 Star
                        </span>

                        <div className="col2">
                          <div className="progress">
                            <div className="progress-bar" style={{width: '50%'}}></div>
                          </div>
                        </div>

                        <span className="col3">
                          (06)
                        </span>
                      </div>

                      <div className="ratingrow d-flex align-items-center">
                        <span className="col1">
                          3 Star
                        </span>

                        <div className="col2">
                          <div className="progress">
                            <div className="progress-bar" style={{width: '25%'}}></div>
                          </div>
                        </div>

                        <span className="col3">
                          (05)
                        </span>
                      </div>

                      <div className="ratingrow d-flex align-items-center">
                        <span className="col1">
                          2 Star
                        </span>

                        <div className="col2">
                          <div className="progress">
                            <div className="progress-bar" style={{width: '15%'}}></div>
                          </div>
                        </div>

                        <span className="col3">
                          (03)
                        </span>
                      </div>

                      <div className="ratingrow d-flex align-items-center">
                        <span className="col1">
                          1 Star
                        </span>

                        <div className="col2">
                          <div className="progress">
                            <div className="progress-bar" style={{width: '5%'}}></div>
                          </div>
                        </div>

                        <span className="col3">
                          (02)
                        </span>
                      </div>
                    </div>


                    <br/>

                    <h6 className="mt-4 mb-4">Customer_reviews</h6>

                    <div className="reviewsSection">
                      <div className="reviewsRow">
                        <div className="row">
                          <div className="col-sm-7 d-flex">
                            <div className="d-flex flex-column">
                              <div className="userInfo d-flex align-items-center mb-3">
                                <div className="userImg lg">
                                  <span className="rounded-circle">
                                    <UserAvtarImgComponent img="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" lg={true} />

                                  </span>
                                </div>


                                <div className="info pl-3">
                                  <h6>Naresh Bhavnagar</h6>
                                  <span>25 minutes ago!</span>
                                </div>

                              </div>


                              <Rating name="read-only" value={4.5} precision={0.5} readOnly />


                            </div>
                          </div>

                          <div className="col-md-5 d-flex align-items-center">
                            <div className="ml-auto">
                                <Button className="btn-blue btn-big btn-lg ml-auto"><FaReply /> &nbsp;   Reply</Button>
                            </div>

                          </div>


                          <p className="mt-3">Lorem Ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, adipisci natus quod magni omnis quas.</p>
                        </div>
                      </div>


                      <div className="reviewsRow reply">
                        <div className="row">
                          <div className="col-sm-7 d-flex">
                            <div className="d-flex flex-column">
                              <div className="userInfo d-flex align-items-center mb-3">
                                <div className="userImg lg">
                                  <span className="rounded-circle">
                                    <UserAvtarImgComponent img="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" lg={true} />

                                  </span>
                                </div>


                                <div className="info pl-3">
                                  <h6>Naresh Bhavnagar</h6>
                                  <span>25 minutes ago!</span>
                                </div>

                              </div>


                              <Rating name="read-only" value={4.5} precision={0.5} readOnly />


                            </div>
                          </div>

                          <div className="col-md-5 d-flex align-items-center">
                            <div className="ml-auto">
                                <Button className="btn-blue btn-big btn-lg ml-auto"><FaReply /> &nbsp;   Reply</Button>
                            </div>

                          </div>


                          <p className="mt-3">Lorem Ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, adipisci natus quod magni omnis quas.</p>
                        </div>
                      </div>

                      <div className="reviewsRow reply">
                        <div className="row">
                          <div className="col-sm-7 d-flex">
                            <div className="d-flex flex-column">
                              <div className="userInfo d-flex align-items-center mb-3">
                                <div className="userImg lg">
                                  <span className="rounded-circle">
                                    <UserAvtarImgComponent img="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" lg={true} />

                                  </span>
                                </div>


                                <div className="info pl-3">
                                  <h6>Naresh Bhavnagar</h6>
                                  <span>25 minutes ago!</span>
                                </div>

                              </div>


                              <Rating name="read-only" value={4.5} precision={0.5} readOnly />


                            </div>
                          </div>

                          <div className="col-md-5 d-flex align-items-center">
                            <div className="ml-auto">
                                <Button className="btn-blue btn-big btn-lg ml-auto"><FaReply /> &nbsp;   Reply</Button>
                            </div>

                          </div>


                          <p className="mt-3">Lorem Ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, adipisci natus quod magni omnis quas.</p>
                        </div>
                      </div>


                      <div className="reviewsRow">
                        <div className="row">
                          <div className="col-sm-7 d-flex">
                            <div className="d-flex flex-column">
                              <div className="userInfo d-flex align-items-center mb-3">
                                <div className="userImg lg">
                                  <span className="rounded-circle">
                                    <UserAvtarImgComponent img="https://api.spicezgold.com/download/file_1734529702603_eyebogler-solid-men-polo-neck-regular-fit-half-sleeves-ethereal-blue-melange-t-shirt-product-images-rvjbg2r4o6-0-202308021954.webp" lg={true} />

                                  </span>
                                </div>


                                <div className="info pl-3">
                                  <h6>Naresh Bhavnagar</h6>
                                  <span>25 minutes ago!</span>
                                </div>

                              </div>


                              <Rating name="read-only" value={4.5} precision={0.5} readOnly />


                            </div>
                          </div>

                          <div className="col-md-5 d-flex align-items-center">
                            <div className="ml-auto">
                                <Button className="btn-blue btn-big btn-lg ml-auto"><FaReply /> &nbsp;   Reply</Button>
                            </div>

                          </div>


                          <p className="mt-3">Lorem Ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, adipisci natus quod magni omnis quas.</p>
                        </div>
                      </div>

                    </div>


                    <br/>

                    <h6 className="mt-4 mb-4">Review Reply Form</h6>

                    <form className="reviewForm">
                      <textarea placeholder="write here">

                      </textarea>

                      <Button className="btn-blue btn-big btn-lg w-100 mt-4">drop your replies</Button>

                    </form>

                </div>

              </div>

            </div>



            
        </>
    )
}

export default ProductDetails;

// import React, { useState } from "react";
// import Slider from "react-slick";

// const ProductDetails = () => {

//   const images = [
//     "https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-0-202211052110.webp",
//     "https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-1-202211052110.webp",
//     "https://api.spicezgold.com/download/file_1734529520274_eyebogler-men-s-full-sleeves-collor-neck-regular-fit-solid-dark-red-t-shirt-product-images-rvoeivrsgi-2-202211052110.webp",
//   ];

//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   const thumbOptions = {
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     infinite: false,
//     arrows: true,
//     dots: false,
//   };

//   return (
//     <>
//       <div className="right-content w-100">

//         <div className="card shadow border-0 w-100 flex-row p-4">
//           <h5 className="mb-0">Product View</h5>
//         </div>

//         <div className="card p-4 product-view-box">
//           <div className="row">
            
//             {/* MAIN IMAGE */}
//             <div className="col-md-4 text-center">
//               <img 
//                 src={selectedImage} 
//                 className="product-main-img" 
//               />

//               {/* Thumbnails Horizontal Slider */}
//               <div className="thumb-slider-box">
//                 <Slider {...thumbOptions}>
//                   {images.map((img, i) => (
//                     <div key={i} className="thumb-item">
//                       <img 
//                         src={img} 
//                         onClick={() => setSelectedImage(img)}
//                         className={selectedImage === img ? "active-thumb" : ""}
//                       />
//                     </div>
//                   ))}
//                 </Slider>
//               </div>
//             </div>

//             <div className="col-md-8">
//               {/* Details baki tamara design pr */}
//             </div>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default ProductDetails;