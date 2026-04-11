import React from "react";
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { IoColorFill } from "react-icons/io5";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { RiStockFill } from "react-icons/ri";
import { MdReviews } from "react-icons/md";
import { MdUnpublished } from "react-icons/md";
import { FaWeightHanging } from "react-icons/fa";
import UserAvtarImgComponent from "../../components/userAvtarImg";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaReply } from "react-icons/fa";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useEffect } from "react";
import ProductZoom from "../../components/ProductZoom";


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
  const [productData, setProductData] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi(`/api/products/${id}`).then((res) => {
      setProductData(res);
    })

    fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
      setReviewData(res);
    })

  }, [id])

  const goToSlide = (index) => {
    productSliderBig.current.slickGoTo(index);
  }

  return (
    <>
      <div className="right-content w-100 productDetails">
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

        <div className='card productDetailsSEction'>
          <div className='row'>
            <div className='col-md-5'>
              <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4"> &nbsp; &nbsp; Product Gallery</h6>
                <ProductZoom images={productData?.images} discount={productData?.discount} />
              </div>
            </div>

            <div className='col-md-7'>
              <div className="pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4">Product Details</h6>

                <h4>{productData?.name}</h4>


                <div className="productInfo mt-4">
                  <div className="row mb-2">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon"><MdBrandingWatermark /></span>
                      <span className="name" style={{ color: 'rgba(255,255,255,0.8)' }}>Brand</span>
                    </div>

                    <div className="col-sm-9">
                      <span>:</span>
                      <span>{productData?.brand}</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon"><BiSolidCategoryAlt /></span>
                      <span className="name" style={{ color: 'rgba(255,255,255,0.8)' }}>Category</span>
                    </div>

                    <div className="col-sm-9">
                      <span>:</span>
                      <span>
                        <ul className="list list-inline tags sml">
                          <li className="list-inline-item">
                            <span style={{ color: '#fff' }}>{productData?.catName}</span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>

                  {
                    productData?.productRam?.length > 0 &&
                    <div className="row">
                      <div className="col-sm-3 d-flex align-items-center">
                        <span className="icon"><IoMdSettings /></span>
                        <span className="name" style={{ color: 'rgba(255,255,255,0.8)' }}>RAM</span>
                      </div>

                      <div className="col-sm-9">
                        <span>:</span>
                        <span>
                          <ul className="list list-inline tags sml">
                            {
                              productData?.productRam?.map((item, index) => {
                                return (
                                  <li className="list-inline-item">
                                    <span>{item}</span>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </span>
                      </div>
                    </div>

                  }



                  {
                    ((productData?.productColor && productData?.productColor?.length > 0) || (productData?.color && productData?.color?.length > 0)) &&
                    <div className="row">
                      <div className="col-sm-3 d-flex align-items-center">
                        <span className="icon"><IoColorFill /></span>
                        <span className="name" style={{ color: 'rgba(255,255,255,0.8)' }}>Color</span>
                      </div>

                      <div className="col-sm-9">
                        <span>:</span>
                        <span>
                          <ul className="list list-inline tags sml">
                            {
                              Array.isArray(productData?.productColor) ?
                                productData?.productColor?.map((item, index) => (
                                  <li className="list-inline-item" key={`pc-${index}`}>
                                    <span>{item}</span>
                                  </li>
                                )) :
                                (productData?.productColor && <li className="list-inline-item"><span>{productData?.productColor}</span></li>)
                            }
                            {
                              Array.isArray(productData?.color) ?
                                productData?.color?.map((item, index) => (
                                  <li className="list-inline-item" key={`c-${index}`}>
                                    <span>{item}</span>
                                  </li>
                                )) :
                                (productData?.color && <li className="list-inline-item"><span>{productData?.color}</span></li>)
                            }
                          </ul>
                        </span>
                      </div>
                    </div>

                  }

                  {
                    ((productData?.productSize && productData?.productSize?.length > 0) || (productData?.size && productData?.size?.length > 0)) &&
                    <div className="row">
                      <div className="col-sm-3 d-flex align-items-center">
                        <span className="icon"><MdPhotoSizeSelectActual /></span>
                        <span className="name" style={{ color: 'rgba(255,255,255,0.8)' }}>Size</span>
                      </div>

                      <div className="col-sm-9">
                        <span>:</span>
                        <span>
                          <ul className="list list-inline tags sml">
                            {
                              Array.isArray(productData?.productSize) ?
                                productData?.productSize?.map((item, index) => (
                                  <li className="list-inline-item" key={`ps-${index}`}>
                                    <span>{item}</span>
                                  </li>
                                )) :
                                (productData?.productSize && <li className="list-inline-item"><span>{productData?.productSize}</span></li>)
                            }
                            {
                              Array.isArray(productData?.size) ?
                                productData?.size?.map((item, index) => (
                                  <li className="list-inline-item" key={`s-${index}`}>
                                    <span>{item}</span>
                                  </li>
                                )) :
                                (productData?.size && <li className="list-inline-item"><span>{productData?.size}</span></li>)
                            }
                          </ul>
                        </span>
                      </div>
                    </div>

                  }

                  {
                    productData?.productWeight?.length > 0 &&
                    <div className="row">
                      <div className="col-sm-3 d-flex align-items-center">
                        <span className="icon"><FaWeightHanging /></span>
                        <span className="name" style={{ color: 'rgba(255,255,255,0.8)' }}>Weight</span>
                      </div>

                      <div className="col-sm-9">
                        <span>:</span>
                        <span>
                          <ul className="list list-inline tags sml">
                            {
                              productData?.productWeight?.map((item, index) => {
                                return (
                                  <li className="list-inline-item" key={index}>
                                    <span>{item}</span>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </span>
                      </div>
                    </div>

                  }

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon"><IoMdPricetag /></span>
                      <span className="name" style={{ color: 'rgba(255,255,255,0.8)' }}>Price</span>
                    </div>

                    <div className="col-sm-9">
                      <span>:</span>
                      <span>₹ {productData?.price}</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon"><RiStockFill /></span>
                      <span className="name" style={{ color: 'rgba(255,255,255,0.8)' }}>Stock</span>
                    </div>

                    <div className="col-sm-9">
                      <span>:</span>
                      <span>({productData?.countInStock}) Available</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon"><MdReviews /></span>
                      <span className="name" style={{ color: 'rgba(255,255,255,0.8)' }}>Review</span>
                    </div>

                    <div className="col-sm-9">
                      <span>:</span>
                      <span>({reviewData?.length}) Review</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon"><MdUnpublished /></span>
                      <span className="name" style={{ color: 'rgba(255,255,255,0.8)' }}>Published</span>
                    </div>

                    <div className="col-sm-9">
                      <span>:</span>
                      <span>{productData?.dateCreated?.split("T")[0]}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>




          <div className="p-4">
            <h6 className="mt-4 mb-3">Product Description</h6>
            <p>{productData?.description}</p>

            {/* 
             <br />

            <h6 className="mt-4 mb-4">Rating Analytics</h6>

            <div className="ratingSection">
              <div className="ratingrow d-flex align-items-center">
                <span className="col1">
                  5 Star
                </span>

                <div className="col2">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: '70%' }}></div>
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
                    <div className="progress-bar" style={{ width: '50%' }}></div>
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
                    <div className="progress-bar" style={{ width: '25%' }}></div>
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
                    <div className="progress-bar" style={{ width: '15%' }}></div>
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
                    <div className="progress-bar" style={{ width: '5%' }}></div>
                  </div>
                </div>

                <span className="col3">
                  (02)
                </span>
              </div>
            </div> */}


            <br />

            {
              reviewData?.length > 0 ?
                <>
                  <h6 className="mt-4 mb-4">Customer Reviews</h6>

                  <div className="reviewsSection">
                    {
                      reviewData?.length > 0 ? reviewData?.map((review, index) => {
                        return (
                          <div className="reviewsRow reviewBox" key={index}>
                            <div className="row">
                              <div className="col-sm-7 d-flex">
                                <div className="userInfo d-flex align-items-center">
                                  <div className="userImg lg">
                                    <span className="rounded-circle">
                                      <UserAvtarImgComponent img="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" lg={true} />
                                    </span>
                                  </div>

                                  <div className="info pl-4" style={{ paddingLeft: '15px' }}>
                                    <h6>{review?.customerName}</h6>
                                    <span>{review?.dateCreated?.split("T")[0]}</span>
                                  </div>
                                </div>
                              </div>

                              {/* <div className="col-md-5 d-flex align-items-center justify-content-end">
                            <Button className="btn-blue btn-big btn-lg ml-auto"><FaReply /> &nbsp;   Reply</Button>
                        </div> */}
                            </div>

                            <div className="row mt-3">
                              <div className="col-12">
                                <Rating name="read-only" value={review?.customerRating} readOnly />
                                <p className="mt-3 mb-0">{review?.review}</p>
                              </div>
                            </div>
                          </div>
                        )
                      }) :
                        <h6 className="mt-4 mb-4">No reviews found for this product.</h6>
                    }

                  </div>
                </>
                :
                <h6 className="mt-4 mb-4">🎶No reviews found for this product.</h6>
            }



            {/* 
            <br />

            <h6 className="mt-4 mb-4">Review Reply Form</h6>

            <form className="reviewForm">
              <textarea placeholder="write here">

              </textarea>

              <Button className="btn-blue btn-big btn-lg w-100 mt-4">drop your replies</Button>

            </form>  */}

          </div>

        </div>

      </div>




    </>
  )
}

export default ProductDetails;