// import ProductZoom from "../../Components/ProductZoom";
// import Rating from '@mui/material/Rating';
// import QuantityBox from "../../Components/QuantityBox";
// import Button from '@mui/material/Button';
// import { BsCartFill } from "react-icons/bs";
// import { useState } from "react";
// import { FaRegHeart } from "react-icons/fa";
// import { MdOutlineCompareArrows } from "react-icons/md";
// import Tooltip from '@mui/material/Tooltip';

// const ProductDrtails = () => {

//   const [activeSize, setActiveSize] = useState(null);
//   const [activeTabs, setActiveTabs] = useState(0);

//   const isActive = (index) => {
//     setActiveSize(index);
//   }


//   return (
//     <>
//       <section className="productDetails section">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-4 pl-5">
//               <ProductZoom />
//             </div>

//             <div className="col-md-7 pl-5 pr-5">
//               <h2 className="hd text-capitalize">All Natural Italin-Style Chicken Meatballs</h2>
//               <ul className="list list-inline d-flex align-items-center">
//                 <li className="list-inline-item">
//                   <div className="d-flex align-items-center">
//                     <span className="text-light mr-2">Brands :</span>
//                     <span>Welch's</span>
//                   </div>
//                 </li>

//                 <li className="list-inline-item">
//                   <div className="d-flex align-items-center">
//                     <Rating name="read-only" value={4.5} precision={0.5} readOnly size="small" />

//                     <span className="text-light cursor ml-2">1 Review</span>
//                   </div>
//                 </li>


//               </ul>


//               <div class="d-flex info mb-3">
//                 <span class="oldPrice">$20.00</span>
//                 <span class="netPrice text-danger ml-2">$14.00</span>
//               </div>

//               <span className="badge badge-success">IN STOCK</span>

//               <p className="mt-3">Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent</p>


//               <div className='productSize d-flex align-items-center'>
//                 <span>Size / Weight:</span>
//                 <ul className='list list-inline mb-0 pl-4'>
//                   <li className='list-inline-item'><a
//                     className={`tag ${activeSize === 0 ? 'active' : ''}`} onClick={() => isActive(0)}>50g</a></li>
//                   <li className='list-inline-item'><a
//                     className={`tag ${activeSize === 1 ? 'active' : ''}`} onClick={() => isActive(1)}>100g</a></li>
//                   <li className='list-inline-item'><a
//                     className={`tag ${activeSize === 2 ? 'active' : ''}`} onClick={() => isActive(2)}>200g</a></li>
//                   <li className='list-inline-item'><a
//                     className={`tag ${activeSize === 3 ? 'active' : ''}`} onClick={() => isActive(3)}>300g</a></li>
//                   <li className='list-inline-item'><a
//                     className={`tag ${activeSize === 4 ? 'active' : ''}`} onClick={() => isActive(4)}>500g</a></li>
//                 </ul>
//               </div>

//               <div className="d-flex align-items-center mt-3">
//                 <QuantityBox />
//                 <Button className="btn-blue btn-lg btn-big btn-round ml-3">
//                   <BsCartFill /> &nbsp; Add to cart
//                 </Button>

//                 <Tooltip title="Add to Wishlist" placement="top">
//                   <Button className="btn-blue btn-lg btn-big btn-circle ml-4">
//                     <FaRegHeart />
//                   </Button>
//                 </Tooltip>

//                 <Tooltip title="Add to Compare" placement="top">
//                   <Button className="btn-blue btn-lg btn-big btn-circle ml-2">
//                     <MdOutlineCompareArrows />
//                   </Button>
//                 </Tooltip>
//               </div>

//             </div>
//           </div>



//           <br />

//           <div className='card mt-5 p-5 detailsPageTabs'>
//             <div className='customTabs'>
//               <ul className='list list-inline'>
//                 <li className='list list-item'>
//                   <Button className={`${activeTabs === 0 && 'active'}`}
//                     onClick={() => {
//                       setActiveTabs(0)
//                     }}
//                   >Description</Button>
//                 </li>
//                 <li className='list-inline-item'>
//                   <Button className={`${activeTabs === 1 && 'active'}`}
//                     onClick={() => {
//                       setActiveTabs(1)
//                     }}
//                   >Additional info</Button>
//                 </li>
//                 <li className='list-inline-item'>
//                   <Button className={`${activeTabs === 2 && 'active'}`}
//                     onClick={() => {
//                       setActiveTabs(2)
//                       // showReviews()
//                     }}
//                   >Reviews (3)</Button>
//                 </li>

//               </ul>


//               <br />

//               {
//                 activeTabs === 0 &&
//                 <div className='tabContent'>
//                   <p>Noodles & Company is an American fast-casual restaurant that offers international and American noodles dishes and pasta in addition to soups and salads. Noodles & Company was founded in 1995 by Aaron Kennedy and is headquartered in Broomfield, Colorado. The Company went public in 2013 and recorded a $457 million revenue in 2017.In late 2018, there were 460 Noodles & Company locations across 29 states and Washington, D.C.</p>
//                 </div>
//               }


//               {
//                 activeTabs === 1 &&
//                 <div className='tabContent'>
//                   <div className='table-responsive'>
//                     <table className='table table-bordered'>
//                       <tbody>
//                         <tr class="stand-up">
//                           <th>Stand Up</th>
//                           <td>
//                             <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
//                           </td>
//                         </tr>
//                         <tr className="folded-wo-wheels">
//                           <th>Folded (w/o wheels)</th>
//                           <td>
//                             <p>32.5″L x 18.5″W x 16.5″H</p>
//                           </td>
//                         </tr>
//                         <tr className="folded-w-wheels">
//                           <th>Folded (w/ wheels)</th>
//                           <td>
//                             <p>32.5″L x 24″W x 18.5″H</p>
//                           </td>
//                         </tr>
//                         <tr class="door-pass-through">
//                           <th>Door Pass Through</th>
//                           <td>
//                             <p>24</p>
//                           </td>
//                         </tr>
//                         <tr class="frame">
//                           <th>Frame</th>
//                           <td>
//                             <p>Aluminum</p>
//                           </td>
//                         </tr>
//                         <tr class="weight-wo-wheels">
//                           <th>Weight (w/o wheels)</th>
//                           <td>
//                             <p>20 LBS</p>
//                           </td>
//                         </tr>
//                         <tr class="weight-capacity">
//                           <th>Weight Capacity</th>
//                           <td>
//                             <p>60 LBS</p>
//                           </td>
//                         </tr>
//                         <tr class="width">
//                           <th>Width</th>
//                           <td>
//                             <p>24″</p>
//                           </td>
//                         </tr>
//                         <tr class="handle-height-ground-to-handle">
//                           <th>Handle height (ground to handle)</th>
//                           <td>
//                             <p>37-45″</p>
//                           </td>
//                         </tr>
//                         <tr class="wheels">
//                           <th>Wheels</th>
//                           <td>
//                             <p>12″ air / wide track slick tread</p>
//                           </td>
//                         </tr>
//                         <tr class="seat-back-height">
//                           <th>Seat back height</th>
//                           <td>
//                             <p>21.5″</p>
//                           </td>
//                         </tr>
//                         <tr class="head-room-inside-canopy">
//                           <th>Head room (inside canopy)</th>
//                           <td>
//                             <p>25″</p>
//                           </td>
//                         </tr>
//                         <tr class="pa_color">
//                           <th>Color</th>
//                           <td>
//                             <p>Black, Blue, Red, White</p>
//                           </td>
//                         </tr>
//                         <tr class="pa_size">
//                           <th>Size</th>
//                           <td>
//                             <p>M, S</p>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               }



//               {
//                 activeTabs === 2 &&

//                 <div className='tabContent'>
//                   <div className='row'>
//                     <div className='col-md-8'>
//                       <h3>Customer qustions & answers</h3>
//                       <br />



//                       <div className='card p-4 reviewsCard flex-row'>
//                         <div className='image'>
//                           <div className='rounded-circle'>
//                             <img src='https://wp.alithems.com/html/nest/demo/assets/imgs/blog/author-2.png' />
//                           </div>
//                           <span className='text-g d-block text-center font-weight-bold'>Naresh Bhavnager</span>
//                         </div>


//                         <div className='info pl-5'>
//                           <div className='d=-flex align-items-center w-100'>
//                             <h5 className='text-light'>27-07-1999</h5>
//                             <div className='ml-auto'>
//                               <Rating name="half-rating-read"
//                                 value={4.5}
//                                 precision={0.5} readOnly
//                               />
//                             </div>
//                           </div>

//                           <p>Noodles & Company is an American fast-casual restaurant that offers international and American noodles dishes and pasta in addition to soups and salads. Noodles & Company was founded in 1995 by Aaron Kennedy and is headquartered in Broomfield, Colorado. The Company went public in 2013 and recorded a $457 million revenue in 2017.In late 2018, there were 460 Noodles & Company locations across 29 states and Washington, D.C. </p>
//                         </div>

//                       </div>


//                       <br className='res-hide' />

//                       <br className='res-hide' />




//                       <from className='reviewFrom'>
//                         <h4>Add a review</h4> <br />
//                         <div className='form-group'>
//                           <textarea className='from-control'
//                             placeholder='Write a Review'
//                             name='rewiew'></textarea>
//                         </div>

//                         <div className='row'>
//                           <div className='col-md-6'>
//                             <div className='form-group'>
//                               <input type='text'
//                                 className='from-control'
//                                 placeholder='Name'
//                                 name='userName' />
//                             </div>
//                           </div>

//                           <div className='col-md-6'>
//                             <div className='form-group'>
//                               <Rating name="rating" value={4.5}
//                                 precision={0.5} />
//                             </div>
//                           </div>

//                         </div>



//                         <br />
//                         <div className='form-group'>
//                           <Button type='submit' className='btn-g btn-lg'>Submit Review</Button>
//                         </div>

//                       </from>



//                     </div>
//                   </div>
//                 </div>
//               }

//             </div>
//           </div>



//         </div>
//       </section>
//     </>
//   )
// }

// export default ProductDrtails;




import ProductZoom from "../../Components/ProductZoom";
import Rating from '@mui/material/Rating';
import QuantityBox from "../../Components/QuantityBox";
import Button from '@mui/material/Button';
import { BsCartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import RelatedProducts from "./RelatedProducts";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchDataFromApi, postData } from "../../utils/api";
import { MyContext } from "../../App";
import { useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';


const ProductDetails = (props) => {

  const [activeSize, setActiveSize] = useState(null);
  const [activeRam, setActiveRam] = useState(null);
  const [activeWeight, setActiveWeight] = useState(null);
  const [activeTabs, setActiveTabs] = useState(0);
  const [productData, setProductData] = useState([]);
  const [relatedProductsData, setRelatedProductsData] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [isAddedToMyList, setIsAddedToMyList] = useState(false);


  let [cartFields, setCartFields] = useState({});
  let [productQuantity, setProductQuantity] = useState();
  const [tabError, setTabError] = useState(false);

  const { id } = useParams();

  const context = useContext(MyContext);

  const isActiveSize = (index) => {
    setActiveSize(index);
    setTabError(false);
  };

  const isActiveRam = (index) => {
    setActiveRam(index);
    setTabError(false);
  };

  const isActiveWeight = (index) => {
    setActiveWeight(index);
    setTabError(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveSize(null);
    setProductData(null);
    setRelatedProductsData([]);
    setIsLoading(true);
    fetchDataFromApi(`/api/products/${id}`).then((res) => {
      if (res !== null) {
        setProductData(res);
        fetchDataFromApi(`/api/products?subCatId=${res?.subCatId}`).then((resRelated) => {
          if (resRelated !== null) {
            const filterData = resRelated?.products?.filter(item => (item.id || item._id) !== id);
            setRelatedProductsData(filterData);
          }
        })

        postData(`/api/products/recentlyViewed`, res).then((response) => {
          fetchDataFromApi(`/api/products/recentlyViewed`).then((responseViews) => {
            if (responseViews !== null && Array.isArray(responseViews)) {
              // Filter out legacy records that don't have a productId
              const validViews = responseViews.filter(item => item.productId);

              const uniqueItems = Array.from(new Set(validViews.map(item => item.productId))).map(id => {
                return validViews.find(item => item.productId === id);
              });

              setRecentlyViewedProducts(uniqueItems);
            }
          })
        })
      }
    })


    fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
      setReviewsData(res);
    })

    if (context.isLogin === true) {
      setReviews(prev => ({
        ...prev,
        customerName: context.user?.name
      }));
    }

    const userData = JSON.parse(localStorage.getItem("user"));

    fetchDataFromApi(`/api/my-list?productId=${id}&userId=${userData?._id}`).then((res) => {
      if (res.length !== 0) {
        setIsAddedToMyList(true);
      }
    })

  }, [id, context.isLogin, context.user])

  const quantity = (val) => {
    setProductQuantity(val);
  }

  const addtoCart = (data) => {

    if (context.isLogin !== true) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please login to add products to cart"
      })
      return;
    }

    if (
      (productData?.productRam?.length > 0 && activeRam === null) ||
      (productData?.size?.length > 0 && activeSize === null) ||
      (productData?.productWeight?.length > 0 && activeWeight === null)
    ) {
      setTabError(true);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    cartFields.productTitle = productData?.name;
    cartFields.images = productData?.images?.length > 0 ? productData?.images[0] : "";
    cartFields.rating = productData?.rating;
    cartFields.price = productData?.price;
    cartFields.quantity = productQuantity;
    cartFields.subTotal = parseInt(productData?.price * productQuantity);
    cartFields.productId = productData?._id;
    cartFields.userId = user?._id;

    cartFields.ram = productData?.productRam?.length > 0 ? productData?.productRam[activeRam] : "";
    cartFields.size = productData?.size?.length > 0 ? productData?.size[activeSize] : "";
    cartFields.weight = productData?.productWeight?.length > 0 ? productData?.productWeight[activeWeight] : "";


    context.addtoCart(cartFields);
  }

  const selectedItem = (item, quantity) => {

  }


  const [rating, setRating] = useState(1);
  const [reviews, setReviews] = useState({
    productId: "",
    customerName: "",
    customerId: "",
    review: "",
    customerRating: 0
  });


  const onChangeInput = (e) => {
    setReviews(() => ({
      ...reviews,
      [e.target.name]: e.target.value
    }));
  }

  const changeRating = (e) => {
    setRating(e.target.value);
    setReviews((prev) => ({
      ...prev,
      customerRating: e.target.value
    }));
  }

  const addReview = (e) => {
    e.preventDefault();

    if (context.isLogin !== true) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please login to add a review"
      });
      return;
    }

    if (reviews.review === "") {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please write a review"
      });
      return;
    }

    if (reviews.customerName === "") {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please provide your name"
      });
      return;
    }

    const reviewData = {
      productId: id,
      customerName: reviews.customerName,
      customerId: context.user?._id,
      review: reviews.review,
      customerRating: rating
    };

    setIsLoading(true);

    postData("/api/productReviews/add", reviewData).then((res) => {
      setIsLoading(false);
      if (res !== undefined && res.error !== true && res.success !== false) {
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Review submitted successfully!"
        });
        setReviews({
          review: "",
          customerName: context.user?.name || "",
          customerRating: 1
        });
        setRating(1);
        fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
          setReviewsData(res);
        })
      } else {
        context.setAlertBox({
          open: true,
          error: true,
          msg: res.msg || "Failed to submit review"
        });
      }
    })

  }

  const addToMyList = (id) => {
    if (context.isLogin !== true) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please login to add products to your wishlist"
      })
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user"));
    const data = {
      productTitle: productData?.name,
      images: productData?.images?.length > 0 ? productData?.images[0] : "",
      rating: productData?.rating,
      price: productData?.price,
      productId: id,
      userId: userData?._id
    }

    postData("/api/my-list/add", data).then((res) => {
      if (res !== undefined && res.status === true) {
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Item added to My List!"
        })
        context.getMyListData();

        fetchDataFromApi(`/api/my-list?productId=${id}&userId=${userData?._id}`).then((res) => {
          if (res.length !== 0) {
            setIsAddedToMyList(true);
          }
        })

      } else {
        context.setAlertBox({
          open: true,
          error: true,
          msg: res?.msg || "Failed to add item to My List!"
        })
      }
    }).catch((err) => {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "An unexpected error occurred!"
      })
    })
  }





  return (
    <>
      <section className="productDetails section">
        <div className="container">
          <div className="row">
            {/* Left - Product Zoom */}
            <div className="col-md-4">
              <ProductZoom images={productData?.images} discount={productData?.discount} />
            </div>

            {/* Right - Product Info */}
            <div className="col-md-7 pl-5">
              <h2 className="hd text-capitalize">
                {productData?.name}
              </h2>

              <ul className="list list-inline d-flex align-items-center">
                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <span className="text-light mr-2">Brands :</span>
                    <span>{productData?.brand}</span>
                  </div>
                </li>

                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <Rating name="read-only" value={parseInt(productData?.rating) || 0} precision={0.5} readOnly size="small" />
                    <span className="text-light cursor ml-2">1 Review</span>
                  </div>
                </li>
              </ul>

              <div className="d-flex info mb-3">
                <span className="oldPrice">Rs: {productData?.oldPrice}</span>
                <span className="netPrice text-danger ml-2">Rs: {productData?.price}</span>
              </div>

              <span className={`badge ${productData?.countInStock > 0 ? 'badge-success' : 'badge-danger'}`}>
                {productData?.countInStock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
              </span>

              <p className="mt-3">
                {productData?.description}
              </p>

              {
                productData?.productRam && productData?.productRam?.length > 0 &&
                < div className="productSize d-flex align-items-center">
                  <span>RAM:</span>
                  <ul className={`list list-inline mb-0 pl-4 ${tabError === true && "error"}`}>
                    {
                      productData?.productRam?.map((item, index) => {
                        return (
                          <li className="list-inline-item" key={index}>
                            <a href="#!"
                              className={`tag ${activeRam === index ? "active" : ""}`}
                              onClick={() => isActiveRam(index)}
                            >
                              {item}
                            </a>
                          </li>
                        )
                      })
                    }

                  </ul>
                </div>
              }

              {
                productData?.size && productData?.size?.length > 0 &&
                < div className="productSize d-flex align-items-center">
                  <span>SIZE:</span>
                  <ul className={`list list-inline mb-0 pl-4 ${tabError === true && "error"}`}>
                    {
                      productData?.size?.map((item, index) => {
                        return (
                          <li className="list-inline-item" key={index}>
                            <a href="#!"
                              className={`tag ${activeSize === index ? "active" : ""}`}
                              onClick={() => isActiveSize(index)}
                            >
                              {item}
                            </a>
                          </li>
                        )
                      })
                    }

                  </ul>
                </div>
              }

              {
                productData?.productWeight && productData?.productWeight?.length > 0 &&
                < div className="productSize d-flex align-items-center">
                  <span>WEIGHT:</span>
                  <ul className={`list list-inline mb-0 pl-4 ${tabError === true && "error"}`}>
                    {
                      productData?.productWeight?.map((item, index) => {
                        return (
                          <li className="list-inline-item" key={index}>
                            <a href="#!"
                              className={`tag ${activeWeight === index ? "active" : ""}`}
                              onClick={() => isActiveWeight(index)}
                            >
                              {item}
                            </a>
                          </li>
                        )
                      })
                    }

                  </ul>
                </div>
              }




              {/* Add to cart + wishlist */}
              <div className="d-flex align-items-center mt-3">
                <QuantityBox quantity={quantity} selectedItem={selectedItem} />
                <Button className={"btn-blue btn-lg btn-big btn-round ml-3"} onClick={() => addtoCart()}>
                  <BsCartFill /> &nbsp;
                  {
                    context.addingInCart === true ? "adding..." : "Add to cart"
                  }
                </Button>

                <Tooltip title={`${isAddedToMyList === true ? 'Added to Wishlist' : 'Add to Wishlist'}`} placement="top">
                  <Button className="btn-blue btn-lg btn-big btn-circle ml-4" onClick={() => addToMyList(id)}>
                    {
                      isAddedToMyList === true ? <FaHeart className="text-danger" />
                        :
                        <>
                          <FaRegHeart />
                        </>
                    }
                  </Button>
                </Tooltip>

                <Tooltip title="Add to Compare" placement="top">
                  <Button className="btn-blue btn-lg btn-big btn-circle ml-2">
                    <MdOutlineCompareArrows />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          <br />

          {/* Tabs Section */}
          <div className="card mt-5 p-5 detailsPageTabs">
            <div className="customTabs">
              <ul className="list list-inline">
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 0 ? "active" : ""}`}
                    onClick={() => setActiveTabs(0)}
                  >
                    Description
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 1 ? "active" : ""}`}
                    onClick={() => setActiveTabs(1)}
                  >
                    Additional info
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button
                    className={`${activeTabs === 2 ? "active" : ""}`}
                    onClick={() => setActiveTabs(2)}
                  >
                    Reviews ({reviewsData?.length})
                  </Button>
                </li>
              </ul>

              <br />

              {activeTabs === 0 && (
                <div className="tabContent">
                  <p>
                    {productData?.description}
                  </p>
                </div>
              )}

              {activeTabs === 1 && (
                <div className="tabContent">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      {/* <tbody>
                        <tr>
                          <th>Frame</th>
                          <td>Aluminum</td>
                        </tr>
                        <tr>
                          <th>Color</th>
                          <td>Black, Blue, Red, White</td>
                        </tr>
                        <tr>
                          <th>Size</th>
                          <td>M, S</td>
                        </tr>
                      </tbody> */}
                      <tbody>
                        <tr class="stand-up">
                          <th>Stand Up</th>
                          <td>
                            <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                          </td>
                        </tr>
                        <tr className="folded-wo-wheels">
                          <th>Folded (w/o wheels)</th>
                          <td>
                            <p>32.5″L x 18.5″W x 16.5″H</p>
                          </td>
                        </tr>
                        <tr className="folded-w-wheels">
                          <th>Folded (w/ wheels)</th>
                          <td>
                            <p>32.5″L x 24″W x 18.5″H</p>
                          </td>
                        </tr>
                        <tr class="door-pass-through">
                          <th>Door Pass Through</th>
                          <td>
                            <p>24</p>
                          </td>
                        </tr>
                        <tr class="frame">
                          <th>Frame</th>
                          <td>
                            <p>Aluminum</p>
                          </td>
                        </tr>
                        <tr class="weight-wo-wheels">
                          <th>Weight (w/o wheels)</th>
                          <td>
                            <p>20 LBS</p>
                          </td>
                        </tr>
                        <tr class="weight-capacity">
                          <th>Weight Capacity</th>
                          <td>
                            <p>60 LBS</p>
                          </td>
                        </tr>
                        <tr class="width">
                          <th>Width</th>
                          <td>
                            <p>24″</p>
                          </td>
                        </tr>
                        <tr class="handle-height-ground-to-handle">
                          <th>Handle height (ground to handle)</th>
                          <td>
                            <p>37-45″</p>
                          </td>
                        </tr>
                        <tr class="wheels">
                          <th>Wheels</th>
                          <td>
                            <p>12″ air / wide track slick tread</p>
                          </td>
                        </tr>
                        <tr class="seat-back-height">
                          <th>Seat back height</th>
                          <td>
                            <p>21.5″</p>
                          </td>
                        </tr>
                        <tr class="head-room-inside-canopy">
                          <th>Head room (inside canopy)</th>
                          <td>
                            <p>25″</p>
                          </td>
                        </tr>
                        <tr class="pa_color">
                          <th>Color</th>
                          <td>
                            <p>Black, Blue, Red, White</p>
                          </td>
                        </tr>
                        <tr class="pa_size">
                          <th>Size</th>
                          <td>
                            <p>M, S</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTabs === 2 && (
                <div className="tabContent">
                  <div className="row">
                    <div className="col-md-8">
                      <h3>Customer questions & answers</h3>
                      <br />

                      {
                        reviewsData?.length > 0 && reviewsData?.slice(0)?.reverse()?.map((item, index) => {
                          return (
                            <div className="card p-4 reviewCard flex-row shadow" key={index}>
                              <div className="info">
                                <div className="d-flex align-items-center w-100">
                                  <h5>{item?.customerName}</h5>
                                  <div className="ml-auto">
                                    <Rating name="half-rating-read"
                                      value={item?.customerRating}
                                      readOnly
                                      size="small" />
                                  </div>
                                </div>

                                <h6 className="text-light">{item?.dateCreated}</h6>

                                <p>
                                  {item?.review}
                                </p>
                              </div>
                            </div>

                          )
                        })
                      }


                      <br className="res-hide" />



                      <form className="reviewForm" onSubmit={addReview}>

                        <h4>Add a review</h4>
                        <div className="form-group">
                          <textarea
                            className="form-control shadow"
                            placeholder="Write a Review"
                            name="review"
                            value={reviews.review}
                            onChange={onChangeInput}
                          ></textarea>
                        </div>

                        <div className="row">

                          <div className="col-md-6">
                            <div className="form-group">
                              <Rating name="rating" value={rating} precision={0.5} onChange={changeRating} />
                            </div>
                          </div>
                        </div>

                        <br />
                        <div className="form-group">
                          <Button type="submit" className="btn-blue btn-lg btn-big" >
                            {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'Submit Review'}
                          </Button>
                        </div>
                      </form>
                    </div>

                    {/* Review Progress
                    <div className="col-md-4">
                      <h4>Customer Reviews</h4>
                      <Rating name="overall" value={4.8} precision={0.1} readOnly />
                      <p>4.8 out of 5</p>

                      {[5, 4, 3, 2, 1].map((star, i) => (
                        <div className="progressBarBox" key={i}>
                          <span>{star} Star</span>
                          <div className="progress">
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: `${Math.floor(Math.random() * 80 + 20)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div> */}
                  </div>
                </div>
              )}

            </div>
          </div>



        </div>
      </section>

      <div className="container">
        <div className="pb-5">
          {
            relatedProductsData?.length > 0 && <RelatedProducts title="RELATED PRODUCTS" data={relatedProductsData} />
          }

          {
            recentlyViewedProducts?.length > 0 && <RelatedProducts title="RECENTLY VIEWED PRODUCTS" data={recentlyViewedProducts} />
          }
        </div>
      </div>
    </>
  );
};

export default ProductDetails;